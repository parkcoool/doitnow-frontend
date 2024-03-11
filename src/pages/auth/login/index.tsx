/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import { CircularProgress } from "@mui/material";
import {
  NavigateNextRounded as NavigateNextRoundedIcon,
  PersonAddAltRounded as PersonAddAltRoundedIcon,
} from "@mui/icons-material";
import Layout from "components/layout/Layout";
import Narrow from "components/layout/Narrow";
import BottomButton from "components/common/BottomButton";
import useSessionStore from "contexts/useSessionStore";

import Identifier from "./Identifier";
import Password from "./Password";
import { handleIdentifierSubmit, handlePasswordSubmit } from "./handleSubmit";

import type { LocationState } from "location";
import type { AuthProvider } from "auth";

interface LoginLocationState extends LocationState {
  step: LoginStep;
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
  const location = useLocation();
  const sessionStore = useSessionStore();

  // location.state로부터 step과 sourceLocation을 가져온다.
  const { step, sourceLocation } = (location.state ?? {
    step: LoginStep.Identifier,
  }) as LoginLocationState;

  // loginData를 관리하는 loginDataReducer를 생성한다.
  const [loginData, loginDataDispatch] = React.useReducer(loginDataReducer, {
    identifier: "",
    password: "",
    authProvider: null,
  });

  // 로딩 여부 및 에러 메시지 상태를 관리한다.
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>();

  // 값 수정이 감지되면 에러 메시지를 초기화한다.
  React.useEffect(() => {
    setErrorMessage(undefined);
  }, [loginData.identifier, loginData.password]);

  async function submitIdentifier() {
    const res = await handleIdentifierSubmit({
      identifier: loginData.identifier,
      setErrorMessage,
      loading,
      setLoading,
    });

    if (!res?.user) return;

    loginDataDispatch({ name: res.user.name });

    navigate("./", {
      state: {
        step: LoginStep.Password,
        sourceLocation: {
          pathname: location.pathname,
        },
      },
    });
  }

  async function submitPassword() {
    const res = await handlePasswordSubmit({
      identifier: loginData.identifier,
      password: loginData.password,
      setErrorMessage,
      loading,
      setLoading,
    });

    if (!res?.token) return;
    const { token } = res;

    // 토큰 저장
    sessionStore.setAccessToken({
      token: token.accessToken.token,
      expiresAt: new Date(new Date().getTime() + token.accessToken.expiresIn * 24 * 60 * 60 * 1000),
    });
    Cookies.set("refreshToken", token.refreshToken.token, {
      expires: token.refreshToken.expiresIn,
      secure: true,
    });

    navigate("/", { replace: true });
  }

  return (
    <Layout
      headerContent="로그인"
      loading={loading}
      onBack={sourceLocation ? () => navigate(sourceLocation.pathname, { state: sourceLocation.state }) : undefined}
      footerDisabled
    >
      {/* step에 따른 컴포넌트 렌더링 */}
      {/* TODO: transition 적용 */}
      <Narrow>
        {step === LoginStep.Identifier && (
          <Identifier
            loginData={loginData}
            loginDataDispatch={loginDataDispatch}
            errorMessage={errorMessage}
            loading={loading}
            onSubmit={submitIdentifier}
          />
        )}
        {step === LoginStep.Password && (
          <Password
            loginData={loginData}
            loginDataDispatch={loginDataDispatch}
            errorMessage={errorMessage}
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
          secondaryText="계정 생성하기"
          primaryButtonProps={{
            variant: "contained",
            disabled:
              loading ||
              (step === LoginStep.Identifier && loginData.identifier === "") ||
              (step === LoginStep.Password && loginData.password === ""),
            endIcon: loading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <NavigateNextRoundedIcon color="inherit" />
            ),
            onClick: step === LoginStep.Identifier ? submitIdentifier : submitPassword,
            disableElevation: true,
          }}
          secondaryButtonProps={{
            startIcon: <PersonAddAltRoundedIcon />,
            onClick: () =>
              navigate("/auth/signup", {
                state: {
                  sourceLocation: {
                    pathname: location.pathname,
                  },
                },
              }),
          }}
        />
      </div>
    </Layout>
  );
}
