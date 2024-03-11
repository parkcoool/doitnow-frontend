/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Stepper, Step, StepLabel, CircularProgress } from "@mui/material";
import { NavigateNextRounded as NavigateNextRoundedIcon } from "@mui/icons-material";

import Layout from "components/layout/Layout";
import Narrow from "components/layout/Narrow";
import BottomButton from "components/common/BottomButton";

import Complete from "./Complete";

import type { LocationState } from "location";

interface PasswordLocationState extends LocationState {
  step: PasswordStep;
}

export interface PasswordData {
  email: string;
  emailCode: string;
  emailExpiresAt?: Date;
  emailVerifyToken?: string;
  password: string;
  passwordConfirm?: string;
}

function passwordDataReducer(state: PasswordData, action: Partial<PasswordData>): PasswordData {
  return { ...state, ...action };
}

export enum PasswordStep {
  Email = 0,
  Verify = 1,
  NewPassword = 2,
  Complete = 3,
}

const stepLabels = ["이메일", "인증", "새 비밀번호"];

export default function Password() {
  const navigate = useNavigate();
  const location = useLocation();

  // location.state로부터 step과 sourceLocation을 가져온다.
  const step = (location.state as PasswordLocationState)?.step ?? PasswordStep.Email;
  const sourceLocation = (location.state as PasswordLocationState)?.sourceLocation;

  // passwordData를 관리하는 passwordDataReducer를 생성한다.
  const [passwordData, passwordDataDispatch] = React.useReducer(passwordDataReducer, {
    email: "",
    emailCode: "",
    password: "",
    passwordConfirm: "",
  });

  // 로딩 여부 및 에러 메시지 상태를 관리한다.
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>();

  // 값 수정이 감지되면 에러 메시지를 초기화한다.
  React.useEffect(() => {
    setErrorMessage(undefined);
  }, [passwordData.email, passwordData.password, passwordData.passwordConfirm, passwordData.emailCode]);

  // 다음 단계로 이동하는 함수
  function handleNextStepClick() {
    setErrorMessage(undefined);

    switch (step) {
      case PasswordStep.Email:
        submitEmail();
        break;
      case PasswordStep.Verify:
        submitVerify();
        break;
      case PasswordStep.NewPassword:
        submitNewPassword();
        break;
      default:
        backToSource();
        break;
    }
  }

  // 이전 단계로 이동하는 함수
  function handleBackStepClick() {
    if (step === PasswordStep.Email) return;
    setErrorMessage(undefined);
    navigate(-1);
  }

  async function submitEmail() {
    // TODO: 실제 API 적용
    const res = await new Promise<{
      email: string;
      expiresAt: string;
    }>((resolve) => {
      setTimeout(() => {
        resolve({
          email: "example@example.com",
          expiresAt: new Date(Date.now() + 1000 * 60 * 5).toISOString(),
        });
      }, 1000);
    });

    if (!res) return;

    // 이메일 주소와 만료 시간을 상태에 저장한다.
    passwordDataDispatch({ email: res.email, emailExpiresAt: new Date(res.expiresAt) });

    // 다음 단계로 이동한다.
    navigate("./", {
      state: {
        step: PasswordStep.Verify,
        sourceLocation,
      },
    });
  }

  async function submitVerify() {
    // 토큰 발급

    // TODO: 실제 API 적용
    const verifyRes = await new Promise<{
      token: string | null;
    }>((resolve) => {
      setTimeout(() => {
        resolve({
          token: "123456",
        });
      }, 1000);
    });

    if (!verifyRes?.token) return;

    // 토큰을 상태에 저장한다.
    passwordDataDispatch({ emailVerifyToken: verifyRes.token });

    // 계정 생성 요청
    const finalRes = await new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });

    if (!finalRes) return;

    // 다음 단계로 이동한다.
    navigate("./", {
      state: {
        step: PasswordStep.Complete,
        sourceLocation,
      },
    });
  }

  function submitNewPassword() {
    if (passwordData.password !== passwordData.passwordConfirm) {
      setErrorMessage("비밀번호가 일치하지 않아요.");
      return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,20}$/.test(passwordData.password)) {
      setErrorMessage("영어, 숫자를 조합하여 8자 이상, 20자 이하여야 해요.");
      return;
    }

    // 다음 단계로 이동한다.
    navigate("./", {
      state: {
        step: PasswordStep.Email,
        sourceLocation,
      },
    });
  }

  function backToSource() {
    if (sourceLocation) {
      navigate(sourceLocation.pathname, { state: sourceLocation.state });
    } else {
      navigate(-1);
    }
  }

  return (
    <Layout headerContent="계정 생성" loading={loading} onBack={backToSource} footerDisabled>
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
        <Narrow>{step === PasswordStep.Complete && <Complete />}</Narrow>
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
          primaryText={step !== PasswordStep.Complete ? "다음" : "완료"}
          secondaryText={step !== PasswordStep.Email && step !== PasswordStep.Complete ? "이전" : undefined}
          primaryButtonProps={{
            variant: "contained",
            onClick: handleNextStepClick,
            disabled:
              loading ||
              (step === PasswordStep.Email && passwordData.email === "") ||
              (step === PasswordStep.Verify && passwordData.emailCode === "") ||
              (step === PasswordStep.NewPassword && passwordData.password === ""),
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
