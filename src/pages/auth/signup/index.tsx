/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Stepper, Step, StepLabel, CircularProgress } from "@mui/material";
import { NavigateNextRounded as NavigateNextRoundedIcon } from "@mui/icons-material";

import Layout from "components/layout/Layout";
import Narrow from "components/layout/Narrow";
import BottomButton from "components/common/BottomButton";

import getReducer from "utils/common/getReducer";
import handleEmailSubmit from "pages/auth/signup/utils/handleEmailSubmit";
import handleNameSubmit from "pages/auth/signup/utils/handleNameSubmit";
import handleVerifySubmit from "utils/handlers/handleVerifySubmit";
import handlePasswordSubmit from "utils/handlers/handlePasswordSubmit";

import Email from "./components/Email";
import Verify from "./components/Verify";
import Name from "./components/Name";
import Password from "./components/Password";
import Complete from "./components/Complete";
import submitSignup from "./utils/submitSignup";

import type { Token } from "auth";
import type { LocationState } from "location";

interface SignupLocationState extends LocationState {
  step: SignupStep;
}

export interface SubmitData {
  email: string;
  emailCode: string;
  name: string;
  password: string;
  passwordConfirm: string;
  emailVerifyToken?: Token;
}

export interface ReceivedData {
  emailVerifyToken?: Token;
  emailCodeExpiresAt?: Date;
  errorMessage?: string;
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

  // submitData를 관리하는 reducer를 생성한다.
  const submitDataReducer = getReducer<SubmitData>();
  const [submitData, submitDataDispatch] = React.useReducer(submitDataReducer, {
    email: "",
    emailCode: "",
    name: "",
    password: "",
    passwordConfirm: "",
  });

  // receivedData를 관리하는 reducer를 생성한다.
  const receivedDataReducer = getReducer<ReceivedData>();
  const [receivedData, receivedDataDispatch] = React.useReducer(receivedDataReducer, {});

  // 로딩 여부 상태를 관리한다.
  const [loading, setLoading] = React.useState(false);

  // 값 수정이 감지되면 에러 메시지를 초기화한다.
  React.useEffect(() => {
    receivedDataDispatch({ errorMessage: undefined });
  }, [submitData]);

  // 다음 단계로 이동하는 함수
  async function handleNextStep(currentStep: SignupStep) {
    let newErrorMessage: string | undefined = undefined;
    let nextStep: SignupStep | undefined = undefined;
    setLoading(true);

    try {
      switch (currentStep) {
        case SignupStep.Name: {
          await handleNameSubmit(submitData.name);
          nextStep = SignupStep.Password;
          break;
        }
        case SignupStep.Password: {
          const partialReceivedData = handlePasswordSubmit(submitData.password, submitData.passwordConfirm);
          receivedDataDispatch(partialReceivedData);
          nextStep = SignupStep.Email;
          break;
        }
        case SignupStep.Email: {
          const partialReceivedData = await handleEmailSubmit(submitData.email);
          receivedDataDispatch(partialReceivedData);
          nextStep = SignupStep.Verify;
          break;
        }
        case SignupStep.Verify: {
          const partialReceivedData = await handleVerifySubmit(submitData.email, submitData.emailCode);
          receivedDataDispatch(partialReceivedData);
          await submitSignup({ ...submitData, emailVerifyToken: partialReceivedData.emailVerifyToken });
          nextStep = SignupStep.Complete;
          break;
        }
        default: {
          backToSource();
          break;
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        newErrorMessage = error.message;
      }
    } finally {
      receivedDataDispatch({ errorMessage: newErrorMessage });
      if (nextStep) navigate("./", { state: { step: nextStep, sourceLocation } });
      setLoading(false);
    }
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
    return (
      loading ||
      (step === SignupStep.Name && submitData.name === "") ||
      (step === SignupStep.Password && (submitData.password === "" || submitData.passwordConfirm === "")) ||
      (step === SignupStep.Email && submitData.email === "") ||
      (step === SignupStep.Verify && submitData.emailCode === "")
    );
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
              submitData={submitData}
              submitDataDispatch={submitDataDispatch}
              receivedData={receivedData}
              loading={loading}
              onSubmit={() => handleNextStep(SignupStep.Name)}
            />
          )}

          {step === SignupStep.Password && (
            <Password
              submitData={submitData}
              submitDataDispatch={submitDataDispatch}
              receivedData={receivedData}
              loading={loading}
              onSubmit={() => handleNextStep(SignupStep.Password)}
            />
          )}

          {step === SignupStep.Email && (
            <Email
              submitData={submitData}
              submitDataDispatch={submitDataDispatch}
              receivedData={receivedData}
              loading={loading}
              onSubmit={() => handleNextStep(SignupStep.Email)}
            />
          )}

          {step === SignupStep.Verify && (
            <Verify
              submitData={submitData}
              submitDataDispatch={submitDataDispatch}
              receivedData={receivedData}
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
            onClick: () => navigate(-1),
          }}
        />
      </div>
    </Layout>
  );
}
