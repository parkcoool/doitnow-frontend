/** @jsxImportSource @emotion/react */

import React from "react";
import { useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import "styles/transition.css";
import Layout from "components/layout/Layout";

import Identifier from "./Identifier";
import Password from "./Password";

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
  // useLocation().state로부터 step을 가져온다.
  // 만약 state가 없다면 step은 LoginStep.Identifier이다.
  const { step } = (useLocation().state ?? {
    step: LoginStep.Identifier,
  }) as LoginLocationState;

  // stepNodeRef를 생성하여 CSSTransition에 전달한다.
  const stepNodeRef = React.useRef<HTMLDivElement>(null);

  // loginData를 관리하는 loginDataReducer를 생성한다.
  const [loginData, loginDataDispatch] = React.useReducer(loginDataReducer, {
    identifier: "",
    password: "",
    authProvider: null,
  });

  return (
    <Layout headerContent={<>로그인</>} footerDisabled>
      <div
        css={{
          overflowX: "hidden",
        }}
      >
        {/* step에 따른 컴포넌트 렌더링 */}
        {/* TODO: transition 적용 */}
        <div ref={stepNodeRef}>
          {step === LoginStep.Identifier && <Identifier loginData={loginData} loginDataDispatch={loginDataDispatch} />}
          {step === LoginStep.Password && <Password loginData={loginData} loginDataDispatch={loginDataDispatch} />}
        </div>
      </div>
    </Layout>
  );
}
