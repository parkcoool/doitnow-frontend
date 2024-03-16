/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Stepper, Step, StepLabel, CircularProgress } from "@mui/material";
import { NavigateNextRounded as NavigateNextRoundedIcon } from "@mui/icons-material";

import handlePasswordSubmit from "utils/handlers/handlePasswordSubmit";
import handleVerifySubmit from "utils/handlers/handleVerifySubmit";
import getReducer from "utils/common/getReducer";

import Layout from "components/layout/Layout";
import Narrow from "components/layout/Narrow";
import BottomButton from "components/common/BottomButton";
import handleEmailSubmit from "./utils/handleEmailSubmit";

import Email from "./components/Email";
import NewPassword from "./components/NewPassword";
import Verify from "./components/Verify";
import Complete from "./components/Complete";

import submitRecovery from "./utils/submitRecovery";

import type { Token } from "auth";

interface PasswordLocationState {
  step: PasswordStep;
}

export interface SubmitData {
  id?: number;
  email: string;
  emailCode: string;
  password: string;
  passwordConfirm: string;
  emailVerifyToken?: Token;
}

export interface ReceivedData {
  emailCodeExpiresAt?: Date;
  emailVerifyToken?: Token;
  errorMessage?: string;
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

  // location.state를 가져온다.
  const step = (location.state as PasswordLocationState)?.step ?? PasswordStep.Email;

  // submitData를 관리하는 reducer를 생성한다.
  const submitDataReducer = getReducer<SubmitData>();
  const [submitData, submitDataDispatch] = React.useReducer(submitDataReducer, {
    email: "",
    emailCode: "",
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
  async function handleNextStep(currentStep: PasswordStep) {
    let newErrorMessage: string | undefined = undefined;
    let nextStep: PasswordStep | undefined = undefined;
    setLoading(true);

    try {
      switch (currentStep) {
        case PasswordStep.Email: {
          const partialReceivedData = await handleEmailSubmit(submitData.email);
          receivedDataDispatch({ emailCodeExpiresAt: partialReceivedData.emailCodeExpiresAt });
          submitDataDispatch({ id: partialReceivedData.id });
          nextStep = PasswordStep.Verify;
          break;
        }
        case PasswordStep.Verify: {
          const partialReceivedData = await handleVerifySubmit(submitData.email, submitData.emailCode);
          receivedDataDispatch(partialReceivedData);
          submitDataDispatch({ emailVerifyToken: partialReceivedData.emailVerifyToken });
          nextStep = PasswordStep.NewPassword;
          break;
        }
        case PasswordStep.NewPassword: {
          const partialReceivedData = handlePasswordSubmit(submitData.password, submitData.passwordConfirm);
          receivedDataDispatch(partialReceivedData);
          await submitRecovery(submitData);
          nextStep = PasswordStep.Complete;
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
      if (nextStep) navigate("./", { state: { step: nextStep } });
      setLoading(false);
    }
  }

  // 원래 페이지로 돌아가는 함수
  function backToSource() {
    navigate(-1 * (step + 1));
  }

  function nextStepButtonDisabled() {
    return (
      loading ||
      (step === PasswordStep.Email && submitData.email === "") ||
      (step === PasswordStep.Verify && submitData.emailCode === "") ||
      (step === PasswordStep.NewPassword && submitData.password === "")
    );
  }

  return (
    <Layout headerContent="계정 복구" loading={loading} footerDisabled>
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
          {step === PasswordStep.Email && (
            <Email
              submitData={submitData}
              submitDataDispatch={submitDataDispatch}
              receivedData={receivedData}
              loading={loading}
              onSubmit={() => handleNextStep(PasswordStep.Email)}
            />
          )}

          {step === PasswordStep.Verify && (
            <Verify
              submitData={submitData}
              submitDataDispatch={submitDataDispatch}
              receivedData={receivedData}
              loading={loading}
              onSubmit={() => handleNextStep(PasswordStep.Verify)}
            />
          )}

          {step === PasswordStep.NewPassword && (
            <NewPassword
              submitData={submitData}
              submitDataDispatch={submitDataDispatch}
              receivedData={receivedData}
              loading={loading}
              onSubmit={() => handleNextStep(PasswordStep.NewPassword)}
            />
          )}

          {step === PasswordStep.Complete && <Complete />}
        </Narrow>
      </div>

      {/* 하단 버튼 */}
      <div
        css={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        <BottomButton
          primaryText={step !== PasswordStep.Complete ? "다음" : "완료"}
          secondaryText={step !== PasswordStep.Email && step !== PasswordStep.Complete ? "이전" : undefined}
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
