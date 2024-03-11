/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Stepper, Step, StepLabel, CircularProgress } from "@mui/material";
import { NavigateNextRounded as NavigateNextRoundedIcon } from "@mui/icons-material";

import Layout from "components/layout/Layout";
import Narrow from "components/layout/Narrow";
import BottomButton from "components/common/BottomButton";

import type { LocationState } from "location";

interface EmailLocationState extends LocationState {
  step: EmailStep;
}

export interface EmailData {
  name: string;
  email?: string;
}

function emailDataReducer(state: EmailData, action: Partial<EmailData>): EmailData {
  return { ...state, ...action };
}

export enum EmailStep {
  Name = 0,
  Complete = 1,
}

const stepLabels = ["아이디", "이메일 확인"];

export default function Email() {
  const navigate = useNavigate();
  const location = useLocation();

  // location.state로부터 step과 sourceLocation을 가져온다.
  const step = (location.state as EmailLocationState)?.step ?? EmailStep.Name;
  const sourceLocation = (location.state as EmailLocationState)?.sourceLocation;

  // emailData를 관리하는 emailDataReducer를 생성한다.
  const [emailData, emailDataDispatch] = React.useReducer(emailDataReducer, {
    name: "",
    email: "",
  });

  // 로딩 여부 및 에러 메시지 상태를 관리한다.
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>();

  // 값 수정이 감지되면 에러 메시지를 초기화한다.
  React.useEffect(() => {
    setErrorMessage(undefined);
  }, [emailData.name]);

  async function submitName() {
    // TODO: 실제 API 적용
    const res = await new Promise<{
      email?: string;
    }>((resolve) => {
      setTimeout(() => {
        resolve({
          email: "example@example.com",
        });
      }, 1000);
    });

    if (!res?.email) return;

    // 다음 단계로 이동한다.
    navigate("./", {
      state: {
        step: EmailStep.Complete,
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
    <Layout headerContent="계정 복구" loading={loading} onBack={backToSource} footerDisabled>
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
          {step === EmailStep.Name && <div />}

          {step === EmailStep.Complete && <div />}
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
          primaryText={step !== EmailStep.Complete ? "다음" : "완료"}
          primaryButtonProps={{
            variant: "contained",
            onClick: submitName,
            disabled: loading || (step === EmailStep.Name && emailData.name === ""),
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
