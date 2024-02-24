/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate } from "react-router-dom";

import { css } from "@emotion/react";
import { TextField, Button } from "@mui/material";

import { LoginData, LoginStep } from "./";

interface PasswordProps {
  loginData: LoginData;
  loginDataDispatch: React.Dispatch<Partial<LoginData>>;
}

export default function Password({ loginData, loginDataDispatch }: PasswordProps) {
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate("./", { state: { step: LoginStep.Complete } });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" autoComplete="email" value={loginData.identifier} readOnly hidden />

      <TextField
        label="비밀번호"
        type="password"
        value={loginData.password}
        autoComplete="current-password"
        onChange={(e) => loginDataDispatch({ password: e.target.value })}
      />

      <Button variant="contained" color="primary" type="submit">
        로그인
      </Button>
    </form>
  );
}
