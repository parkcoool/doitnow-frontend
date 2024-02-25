/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Chip } from "@mui/material";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";

import { inputStyle, formStyle } from "./style";
import { LoginData, LoginStep } from "./";

import type { Theme } from "@mui/material";

interface PasswordProps {
  loginData: LoginData;
  loginDataDispatch: React.Dispatch<Partial<LoginData>>;
  theme: Theme;
}

export default function Password({ loginData, loginDataDispatch, theme }: PasswordProps) {
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate("./", { state: { step: LoginStep.Complete } });
  }

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "100%",
      }}
    >
      <Chip
        css={{ width: "fit-content" }}
        icon={<AlternateEmailRoundedIcon />}
        label={loginData.name}
        color="primary"
        variant="outlined"
        onClick={() => navigate(-1)}
        clickable
      />

      <form onSubmit={handleSubmit} css={formStyle(theme)}>
        <input type="email" autoComplete="email" value={loginData.identifier} readOnly hidden />

        <TextField
          css={inputStyle(theme)}
          label="비밀번호"
          type="password"
          value={loginData.password}
          autoComplete="current-password"
          onChange={(e) => loginDataDispatch({ password: e.target.value })}
        />

        <div
          css={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button variant="text" color="primary" onClick={() => navigate(-1)}>
            이메일 변경
          </Button>
          <Button variant="contained" color="primary" type="submit">
            로그인
          </Button>
        </div>
      </form>
    </div>
  );
}
