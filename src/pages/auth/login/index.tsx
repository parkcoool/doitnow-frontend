/** @jsxImportSource @emotion/react */

import React from "react";
import { useLocation } from "react-router-dom";

import getToken from "apis/getToken";

import Identifier from "./Identifier";
import Password from "./Password";
import Complete from "./Complete";

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
  // useLocation().state로부터 step을 가져온다.
  const { step } = (useLocation().state ?? {
    step: LoginStep.Identifier,
  }) as LoginLocationState;

  const [loginData, loginDataDispatch] = React.useReducer(loginDataReducer, {
    identifier: "",
    password: "",
    authProvider: null,
  });

  // step에 따라 해당하는 컴포넌트를 렌더링한다.
  return (
    <>
      {step === LoginStep.Identifier && <Identifier loginData={loginData} loginDataDispatch={loginDataDispatch} />}
      {step === LoginStep.Password && <Password loginData={loginData} loginDataDispatch={loginDataDispatch} />}
      {step === LoginStep.Complete && <Complete loginData={loginData} loginDataDispatch={loginDataDispatch} />}
    </>
  );
}
