/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Chip } from "@mui/material";
import {
  HelpOutlineRounded as HelpOutlineRoundedIcon,
  AccountCircleRounded as AccountCircleRoundedIcon,
} from "@mui/icons-material";

import type { LoginData } from "./";

interface PasswordProps {
  loginData: LoginData;
  loginDataDispatch: React.Dispatch<Partial<LoginData>>;
  loading: boolean;
  onSubmit: () => void;
}

export default function Password({ loginData, loginDataDispatch, loading, onSubmit }: PasswordProps) {
  const navigate = useNavigate();

  async function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    onSubmit();
  }

  return (
    <>
      {/* 설명 */}
      <h1
        css={{
          fontFamily: `"Pretendard", sans-serif`,
          fontSize: "24px",
          fontWeight: 700,
          margin: "16px 0 0 0",
        }}
      >
        DoItNow 시작하기
      </h1>
      <h2
        css={{
          fontFamily: `"Pretendard", sans-serif`,
          fontSize: "16px",
          fontWeight: 500,
          margin: "4px 0 0 0",
        }}
      >
        비밀번호를 입력해주세요.
      </h2>

      <div
        css={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          margin: "32px 0 0 0",
          gap: "8px",
        }}
      >
        <Chip
          avatar={<AccountCircleRoundedIcon />}
          label={loginData.identifier}
          variant="outlined"
          onClick={() => navigate(-1)}
          css={{
            fontWeight: 600,
          }}
        />
      </div>

      {/* 폼 */}
      <form
        onSubmit={handleSubmit}
        css={{
          margin: "16px 0 0 0",
        }}
      >
        <TextField
          disabled={loading}
          label="비밀번호"
          type="password"
          autoComplete="password"
          onChange={(e) => loginDataDispatch({ password: e.target.value })}
          css={{
            width: "100%",
            margin: "0",
          }}
        />
      </form>

      {/* 버튼 */}
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          margin: "16px 0 0 0",
        }}
      >
        <Button startIcon={<HelpOutlineRoundedIcon />}>비밀번호를 잊어버렸어요.</Button>
      </div>
    </>
  );
}
