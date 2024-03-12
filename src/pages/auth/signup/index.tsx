/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Stepper, Step, StepLabel, CircularProgress } from "@mui/material";
import { NavigateNextRounded as NavigateNextRoundedIcon } from "@mui/icons-material";

import Layout from "components/layout/Layout";
import Narrow from "components/layout/Narrow";
import BottomButton from "components/common/BottomButton";

import Email from "./components/Email";
import Verify from "./components/Verify";
import Name from "./components/Name";
import Password from "./components/Password";
import Complete from "./components/Complete";

import handleEmailSubmit from "./utils/handleEmailSubmit";
import handleNameSubmit from "./utils/handleNameSubmit";
import handlePasswordSubmit from "./utils/handlePasswordSubmit";
import handleVerifySubmit from "./utils/handleVerifySubmit";

import type { LocationState } from "location";

interface SignupLocationState extends LocationState {
  step: SignupStep;
}

// TODO: SignupData를 서버에 보낼 정보로만 구성하기
export interface SignupData {
  email: string;
  emailCode: string;
  emailExpiresAt?: Date;
  name: string;
  password: string;
  passwordConfirm: string;
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

const stepLabels = ["아이디", "비밀번호", "이메일", "인증"];

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
  }, [signupData.email, signupData.name, signupData.password, signupData.passwordConfirm, signupData.emailCode]);

  // 다음 단계로 이동하는 함수
  async function handleNextStep(currentStep: SignupStep) {
    let newErrorMessage: string | undefined = undefined;
    let partialSignupData: Partial<SignupData> | undefined = undefined;
    let nextStep: SignupStep | undefined = undefined;
    setLoading(true);

    try {
      switch (currentStep) {
        case SignupStep.Name:
          partialSignupData = await handleNameSubmit(signupData.name);
          nextStep = SignupStep.Password;
          break;
        case SignupStep.Password:
          partialSignupData = handlePasswordSubmit(signupData.password, signupData.passwordConfirm);
          nextStep = SignupStep.Email;
          break;
        case SignupStep.Email:
          partialSignupData = await handleEmailSubmit(signupData.email);
          nextStep = SignupStep.Verify;
          break;
        case SignupStep.Verify: {
          partialSignupData = await handleVerifySubmit(signupData.email, signupData.emailCode, signupData);
          nextStep = SignupStep.Complete;
          break;
        }
        default:
          backToSource();
          break;
      }
    } catch (error) {
      if (error instanceof Error) {
        newErrorMessage = error.message;
      }
    } finally {
      setErrorMessage(newErrorMessage);
      if (partialSignupData) signupDataDispatch(partialSignupData);
      if (nextStep) navigate("./", { state: { step: nextStep, sourceLocation } });
      setLoading(false);
    }
  }

  // 이전 단계로 이동하는 함수
  function handleBackStepClick() {
    setErrorMessage(undefined);
    navigate(-1);
  }

  // 원래 페이지로 돌아가는 함수
  function backToSource() {
    if (sourceLocation) {
      navigate(sourceLocation.pathname, { state: sourceLocation.state });
    } else {
      navigate(-1);
    }
  }

  function nextStepButtonDisabled() {
    if (step === SignupStep.Name) return !signupData.name;
    if (step === SignupStep.Password) return !signupData.password || !signupData.passwordConfirm;
    if (step === SignupStep.Email) return !signupData.email;
    if (step === SignupStep.Verify) return !signupData.emailCode;
    return false;
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
        <Narrow>
          {step === SignupStep.Name && (
            <Name
              signupData={signupData}
              signupDataDispatch={signupDataDispatch}
              errorMessage={errorMessage}
              loading={loading}
              onSubmit={() => handleNextStep(SignupStep.Name)}
            />
          )}

          {step === SignupStep.Password && (
            <Password
              signupData={signupData}
              signupDataDispatch={signupDataDispatch}
              errorMessage={errorMessage}
              loading={loading}
              onSubmit={() => handleNextStep(SignupStep.Password)}
            />
          )}

          {step === SignupStep.Email && (
            <Email
              signupData={signupData}
              signupDataDispatch={signupDataDispatch}
              errorMessage={errorMessage}
              loading={loading}
              onSubmit={() => handleNextStep(SignupStep.Email)}
            />
          )}

          {step === SignupStep.Verify && (
            <Verify
              signupData={signupData}
              signupDataDispatch={signupDataDispatch}
              errorMessage={errorMessage}
              loading={loading}
              onSubmit={() => handleNextStep(SignupStep.Verify)}
            />
          )}

          {step === SignupStep.Complete && <Complete />}
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
          primaryText={step !== SignupStep.Complete ? "다음" : "완료"}
          secondaryText={step !== SignupStep.Name && step !== SignupStep.Complete ? "이전" : undefined}
          primaryButtonProps={{
            variant: "contained",
            onClick: () => handleNextStep(step),
            disabled: nextStepButtonDisabled(),
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
