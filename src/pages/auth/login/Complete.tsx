/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate } from "react-router-dom";

import getToken from "apis/getToken";

import { inputStyle, formStyle } from "./style";
import { LoginData, LoginStep } from "./";

import type { Theme } from "@mui/material";

interface CompleteProps {
  loginData: LoginData;
  loginDataDispatch: React.Dispatch<Partial<LoginData>>;
  theme: Theme;
}

enum LoginResult {
  Success = "success",
  Fail = "fail",
  Pending = "pending",
  Error = "error",
}

export default function Complete({ loginData, loginDataDispatch, theme }: CompleteProps) {
  const navigate = useNavigate();

  const [loginResult, setLoginResult] = React.useState<LoginResult>(LoginResult.Pending);

  React.useEffect(() => {
    // 페이지가 렌더링되면 로그인 요청을 보낸다.
    getToken({
      authProvider: loginData.authProvider,
      identifier: loginData.identifier,
      password: loginData.password,
    })
      .then((res) => {
        if (res.code !== 1000) {
          setLoginResult(LoginResult.Fail);
          loginDataDispatch({ password: "" });
          navigate("./", { state: { step: LoginStep.Identifier, message: res.message } });
        } else {
          setLoginResult(LoginResult.Success);
        }
      })
      .catch((e: Error) => {
        console.error(e);

        setLoginResult(LoginResult.Error);
        loginDataDispatch({ password: "" });
        navigate("./", { state: { step: LoginStep.Identifier, message: e.message } });
      });
  }, []);

  return (
    <>
      {loginResult === LoginResult.Pending && <p>로그인 중...</p>}
      {loginResult === LoginResult.Success && <p>로그인 성공</p>}
      {loginResult === LoginResult.Fail && <p>로그인 실패</p>}
      {loginResult === LoginResult.Error && <p>로그인 실패</p>}
    </>
  );
}
