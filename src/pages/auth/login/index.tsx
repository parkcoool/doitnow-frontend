/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { CircularProgress } from "@mui/material";
import {
  NavigateNextRounded as NavigateNextRoundedIcon,
  PersonAddAltRounded as PersonAddAltRoundedIcon,
} from "@mui/icons-material";
import Layout from "components/layout/Layout";

import Narrow from "components/layout/Narrow";
import BottomButton from "components/common/BottomButton";
import Identifier from "./Identifier";
import Password from "./Password";

import { handleIdentifierSubmit, handlePasswordSubmit } from "./handleSubmit";
import type { AuthProvider } from "auth";

interface LoginLocationState {
  step: LoginStep;
  message?: string;
}

export interface LoginData {
  identifier: string;
  name?: string;
  password: string;
  authProvider: AuthProvider;
}

function loginDataReducer(state: LoginData, action: Partial<LoginData>): LoginData {
  return { ...state, ...action };
}

export enum LoginStep {
  Identifier = "identifier",
  Password = "password",
}

export default function Login() {
  const navigate = useNavigate();

  // useLocation().state로부터 step을 가져온다.
  // 만약 state가 없다면 step은 LoginStep.Identifier이다.
  const { step } = (useLocation().state ?? {
    step: LoginStep.Identifier,
  }) as LoginLocationState;

  // loginData를 관리하는 loginDataReducer를 생성한다.
  const [loginData, loginDataDispatch] = React.useReducer(loginDataReducer, {
    identifier: "",
    password: "",
    authProvider: null,
  });

  // loading 상태를 관리한다.
  const [loading, setLoading] = React.useState(false);

  function submitIdentifier() {
    handleIdentifierSubmit({
      identifier: loginData.identifier,
      navigate,
      loading,
      setLoading,
      loginDataDispatch,
    });
  }

  function submitPassword() {
    handlePasswordSubmit({
      identifier: loginData.identifier,
      password: loginData.password,
      navigate,
      loading,
      setLoading,
      loginDataDispatch,
    });
  }

  return (
    <Layout headerContent={<>로그인</>} loading={loading} footerDisabled>
      {/* step에 따른 컴포넌트 렌더링 */}
      {/* TODO: transition 적용 */}
      <Narrow>
        {step === LoginStep.Identifier && (
          <Identifier
            loginData={loginData}
            loginDataDispatch={loginDataDispatch}
            loading={loading}
            onSubmit={submitIdentifier}
          />
        )}
        {step === LoginStep.Password && (
          <Password
            loginData={loginData}
            loginDataDispatch={loginDataDispatch}
            loading={loading}
            onSubmit={submitPassword}
          />
        )}
      </Narrow>

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
          secondaryText={step === LoginStep.Identifier ? "계정 생성하기" : undefined}
          primaryButtonProps={{
            variant: "contained",
            disabled: loading || loginData.identifier === "",
            endIcon: loading ? <CircularProgress size={16} color="inherit" /> : <NavigateNextRoundedIcon />,
            onClick: step === LoginStep.Identifier ? submitIdentifier : submitPassword,
            disableElevation: true,
          }}
          secondaryButtonProps={{
            startIcon: <PersonAddAltRoundedIcon />,
          }}
        />
      </div>
    </Layout>
  );
}
