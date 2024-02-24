/** @jsxImportSource @emotion/react */

import React from "react";
import { useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { useTheme } from "@mui/material/styles";
import { ReactComponent as LogoIcon } from "assets/icon/common/doitnow_icon.svg";
import "styles/transition.css";

import Identifier from "./Identifier";
import Password from "./Password";
import Complete from "./Complete";
import { formContainerStyle } from "./style";

import type { AuthProvider } from "auth";

interface LoginLocationState {
  step: LoginStep;
  message?: string;
}

export interface LoginData {
  identifier: string;
  password: string;
  authProvider: AuthProvider;
}

function loginDataReducer(state: LoginData, action: Partial<LoginData>): LoginData {
  return { ...state, ...action };
}

export enum LoginStep {
  Identifier = 0,
  Password = 1,
  Complete = 2,
}

export default function Login() {
  const theme = useTheme();

  // useLocation().state로부터 step을 가져온다.
  const { step } = (useLocation().state ?? {
    step: LoginStep.Identifier,
  }) as LoginLocationState;

  // stepNodeRef를 생성하여 CSSTransition에 전달한다.
  const stepNodeRef = React.useRef<HTMLDivElement>(null);

  // stepRef를 생성하여 step을 관리한다.
  const stepRef = React.useRef<LoginStep>(step);

  // loginData를 관리하는 loginDataReducer를 생성한다.
  const [loginData, loginDataDispatch] = React.useReducer(loginDataReducer, {
    identifier: "",
    password: "",
    authProvider: null,
  });

  return (
    <div css={formContainerStyle(theme)}>
      <div
        css={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* 상단 로고 및 텍스트 */}
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <LogoIcon
            css={{
              width: "48px",
              height: "48px",
              margin: "0.5rem 0",
            }}
          />

          <h1
            css={{
              fontSize: "1.5rem",
              fontFamily: "pretendard",
              margin: "0.5rem 0",
            }}
          >
            DoItNow 로그인
          </h1>

          <h2
            css={{
              fontSize: "1rem",
              fontFamily: "pretendard",
              fontWeight: "normal",
              color: theme.palette.grey[600],
              margin: "0",
            }}
          >
            로그인하여 DoItNow 서비스를 이용하세요.
          </h2>
        </div>

        {/* step에 따른 컴포넌트 렌더링 */}
        {/* TODO: transition 방향 설정 */}
        <SwitchTransition mode="out-in">
          <CSSTransition key={step} timeout={300} classNames={`slide-${"left"}`} nodeRef={stepNodeRef}>
            <div ref={stepNodeRef}>
              {step === LoginStep.Identifier && (
                <Identifier loginData={loginData} loginDataDispatch={loginDataDispatch} theme={theme} />
              )}
              {step === LoginStep.Password && (
                <Password loginData={loginData} loginDataDispatch={loginDataDispatch} theme={theme} />
              )}
              {step === LoginStep.Complete && (
                <Complete loginData={loginData} loginDataDispatch={loginDataDispatch} theme={theme} />
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
}
