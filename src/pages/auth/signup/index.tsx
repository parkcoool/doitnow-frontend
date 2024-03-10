/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Stepper, Step, StepLabel, CircularProgress } from "@mui/material";
import { NavigateNextRounded as NavigateNextRoundedIcon } from "@mui/icons-material";

import Layout from "components/layout/Layout";
import Narrow from "components/layout/Narrow";
import BottomButton from "components/common/BottomButton";

import type { LocationState } from "location";

interface SignupLocationState extends LocationState {
  step: SignupStep;
}

export interface SignupData {
  email: string;
  emailToken: string;
  name: string;
  password: string;
}

function signupDataReducer(state: SignupData, action: Partial<SignupData>): SignupData {
  return { ...state, ...action };
}

export enum SignupStep {
  Email = 0,
  Verify = 1,
  Name = 2,
  Password = 3,
}

const stepLabels = ["이메일", "인증", "이름", "비밀번호"];

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  // location.state로부터 step과 sourceLocation을 가져온다.
  const step = (location.state as SignupLocationState)?.step ?? SignupStep.Email;
  const sourceLocation = (location.state as SignupLocationState)?.sourceLocation;

  // signupData를 관리하는 signupDataReducer를 생성한다.
  const [signupData, signupDataDispatch] = React.useReducer(signupDataReducer, {
    email: "",
    emailToken: "",
    name: "",
    password: "",
  });

  // 로딩 여부 및 단계 상태를 관리한다.
  const [loading, setLoading] = React.useState(false);

  // 다음 단계로 이동하는 함수
  function handleNextStepClick() {
    let nextStep;
    switch (step) {
      case SignupStep.Email:
        nextStep = SignupStep.Verify;
        break;
      case SignupStep.Verify:
        nextStep = SignupStep.Name;
        break;
      case SignupStep.Name:
        nextStep = SignupStep.Password;
        break;
      default:
        nextStep = SignupStep.Email;
        break;
    }

    navigate("./", {
      state: {
        step: nextStep,
        sourceLocation,
      },
    });
  }

  // 이전 단계로 이동하는 함수
  function handleBackStepClick() {
    if (step === SignupStep.Email) return;
    navigate(-1);
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
        <Narrow>d</Narrow>
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
          secondaryText={step !== SignupStep.Email ? "이전" : undefined}
          primaryButtonProps={{
            variant: "contained",
            onClick: handleNextStepClick,
            disabled: loading,
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
