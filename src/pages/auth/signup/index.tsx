/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Stepper, Step, StepLabel, CircularProgress } from "@mui/material";
import { NavigateNextRounded as NavigateNextRoundedIcon } from "@mui/icons-material";

import Layout from "components/layout/Layout";
import Narrow from "components/layout/Narrow";
import BottomButton from "components/common/BottomButton";

import Email from "./Email";
import { handleEmailSubmit, handleNameSubmit, handleVerifySubmit } from "./handleSubmit";

import Verify from "./Verify";
import Name from "./Name";
import Password from "./Password";
import type { LocationState } from "location";

interface SignupLocationState extends LocationState {
  step: SignupStep;
}

export interface SignupData {
  email: string;
  emailCode: string;
  emailExpiresAt?: Date;
  emailVerifyToken?: string;
  name: string;
  password: string;
  passwordConfirm?: string;
}

function signupDataReducer(state: SignupData, action: Partial<SignupData>): SignupData {
  return { ...state, ...action };
}

export enum SignupStep {
  Name = 0,
  Password = 1,
  Email = 2,
  Verify = 3,
  Complete = 4,
}

const stepLabels = ["이름", "비밀번호", "이메일", "인증"];

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  // location.state로부터 step과 sourceLocation을 가져온다.
  const step = (location.state as SignupLocationState)?.step ?? SignupStep.Name;
  const sourceLocation = (location.state as SignupLocationState)?.sourceLocation;

  // signupData를 관리하는 signupDataReducer를 생성한다.
  const [signupData, signupDataDispatch] = React.useReducer(signupDataReducer, {
    email: "",
    emailCode: "",
    name: "",
    password: "",
    passwordConfirm: "",
  });

  // 로딩 여부 및 에러 메시지 상태를 관리한다.
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>();

  // 값 수정이 감지되면 에러 메시지를 초기화한다.
  React.useEffect(() => {
    setErrorMessage(undefined);
  }, [signupData.email, signupData.name, signupData.password]);

  // 다음 단계로 이동하는 함수
  function handleNextStepClick() {
    setErrorMessage(undefined);

    switch (step) {
      case SignupStep.Name:
        submitName();
        break;
      case SignupStep.Password:
        submitPassword();
        break;
      case SignupStep.Email:
        submitEmail();
        break;
      case SignupStep.Verify:
        submitVerify();
        break;
      default:
        break;
    }
  }

  // 이전 단계로 이동하는 함수
  function handleBackStepClick() {
    if (step === SignupStep.Name) return;
    setErrorMessage(undefined);
    navigate(-1);
  }

  async function submitName() {
    const res = await handleNameSubmit({
      name: signupData.name,
      setErrorMessage,
      loading,
      setLoading,
    });

    if (!res) return;

    // 다음 단계로 이동한다.
    navigate("./", {
      state: {
        step: SignupStep.Password,
        sourceLocation,
      },
    });
  }

  function submitPassword() {
    if (signupData.password !== signupData.passwordConfirm) {
      setErrorMessage("비밀번호가 일치하지 않아요.");
      return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,20}$/.test(signupData.password)) {
      setErrorMessage("영어, 숫자를 조합하여 8자 이상, 20자 이하여야 해요.");
      return;
    }

    // 다음 단계로 이동한다.
    navigate("./", {
      state: {
        step: SignupStep.Email,
        sourceLocation,
      },
    });
  }

  async function submitEmail() {
    const res = await handleEmailSubmit({
      email: signupData.email,
      setErrorMessage,
      loading,
      setLoading,
    });

    if (!res) return;

    // 이메일 주소와 만료 시간을 상태에 저장한다.
    signupDataDispatch({ email: res.email, emailExpiresAt: new Date(res.expiresAt) });

    // 다음 단계로 이동한다.
    navigate("./", {
      state: {
        step: SignupStep.Verify,
        sourceLocation,
      },
    });
  }

  async function submitVerify() {
    const res = await handleVerifySubmit({
      email: signupData.email,
      code: signupData.emailCode,
      setErrorMessage,
      loading,
      setLoading,
    });

    if (!res?.token) return;

    // 토큰을 상태에 저장한다.
    signupDataDispatch({ emailVerifyToken: res.token });

    // 다음 단계로 이동한다.
    navigate("./", {
      state: {
        step: SignupStep.Complete,
        sourceLocation,
      },
    });
  }

  return (
    <Layout
      headerContent="계정 생성"
      loading={loading}
      onBack={sourceLocation && (() => navigate(sourceLocation.pathname, { state: sourceLocation.state }))}
      footerDisabled
    >
      {/* Stepper 컴포넌트를 사용하여 단계 표시 */}
      <div
        css={{
          marginTop: "16px",
        }}
      >
        <Stepper activeStep={step} alternativeLabel>
          {stepLabels.map((stepLabel) => (
            <Step key={stepLabel}>
              <StepLabel>{stepLabel}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {/* step에 따른 컴포넌트 렌더링 */}
      <div
        css={{
          marginTop: "24px",
        }}
      >
        <Narrow>
          {step === SignupStep.Name && (
            <Name
              signupData={signupData}
              signupDataDispatch={signupDataDispatch}
              errorMessage={errorMessage}
              loading={loading}
              onSubmit={submitName}
            />
          )}

          {step === SignupStep.Password && (
            <Password
              signupData={signupData}
              signupDataDispatch={signupDataDispatch}
              errorMessage={errorMessage}
              loading={loading}
              onSubmit={submitPassword}
            />
          )}

          {step === SignupStep.Email && (
            <Email
              signupData={signupData}
              signupDataDispatch={signupDataDispatch}
              errorMessage={errorMessage}
              loading={loading}
              onSubmit={submitEmail}
            />
          )}

          {step === SignupStep.Verify && (
            <Verify
              signupData={signupData}
              signupDataDispatch={signupDataDispatch}
              errorMessage={errorMessage}
              loading={loading}
              onSubmit={submitVerify}
            />
          )}
        </Narrow>
      </div>

      {/* 하단 버튼 */}
      <div
        css={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <BottomButton
          primaryText="다음"
          secondaryText={step !== SignupStep.Name ? "이전" : undefined}
          primaryButtonProps={{
            variant: "contained",
            onClick: handleNextStepClick,
            disabled:
              loading ||
              (step === SignupStep.Name && signupData.name === "") ||
              (step === SignupStep.Email && signupData.email === "") ||
              (step === SignupStep.Verify && signupData.emailCode === ""),
            endIcon: loading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <NavigateNextRoundedIcon color="inherit" />
            ),
            disableElevation: true,
          }}
          secondaryButtonProps={{
            onClick: handleBackStepClick,
          }}
        />
      </div>
    </Layout>
  );
}
