/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Stepper, Step, StepLabel, CircularProgress } from "@mui/material";
import { NavigateNextRounded as NavigateNextRoundedIcon } from "@mui/icons-material";

import getReducer from "utils/common/getReducer";

import Layout from "components/layout/Layout";
import Narrow from "components/layout/Narrow";
import BottomButton from "components/common/BottomButton";

import Name from "./components/Name";
import Complete from "./components/Complete";
import handleNameSubmit from "./utils/handleNameSubmit";

interface EmailLocationState {
  step: EmailStep;
}

export interface SubmitData {
  name: string;
}

export interface ReceivedData {
  email?: string;
  errorMessage?: string;
}

export enum EmailStep {
  Name = 0,
  Complete = 1,
}

const stepLabels = ["아이디", "확인"];

export default function Email() {
  const navigate = useNavigate();
  const location = useLocation();

  // location.state를 가져온다.
  const step = (location.state as EmailLocationState)?.step ?? EmailStep.Name;

  // submitData를 관리하는 reducer를 생성한다.
  const submitDataReducer = getReducer<SubmitData>();
  const [submitData, submitDataDispatch] = React.useReducer(submitDataReducer, {
    name: "",
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
  async function handleNextStep(currentStep: EmailStep) {
    let newErrorMessage: string | undefined = undefined;
    let nextStep: EmailStep | undefined = undefined;
    setLoading(true);

    try {
      switch (currentStep) {
        case EmailStep.Name: {
          const partialReceivedData = await handleNameSubmit(submitData.name);
          receivedDataDispatch(partialReceivedData);
          nextStep = EmailStep.Complete;
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
    return loading || (step === EmailStep.Name && submitData.name.length === 0);
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
          {step === EmailStep.Name && (
            <Name
              submitData={submitData}
              submitDataDispatch={submitDataDispatch}
              receivedData={receivedData}
              loading={loading}
              onSubmit={() => handleNextStep(EmailStep.Name)}
            />
          )}

          {step === EmailStep.Complete && <Complete receivedData={receivedData} />}
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
          primaryText={step !== EmailStep.Complete ? "다음" : "완료"}
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
        />
      </div>
    </Layout>
  );
}
