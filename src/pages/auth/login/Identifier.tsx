/** @jsxImportSource @emotion/react */

import React from "react";
import { TextField, Button } from "@mui/material";
import { HelpOutlineRounded as HelpOutlineRoundedIcon } from "@mui/icons-material";

import type { LoginData } from "./";

interface IdentifierProps {
  loginData: LoginData;
  loginDataDispatch: React.Dispatch<Partial<LoginData>>;
  errorMessage?: string;
  loading: boolean;
  onSubmit: () => void;
}

export default function Identifier({ loginData, loginDataDispatch, errorMessage, loading, onSubmit }: IdentifierProps) {
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
        Sign in Now
      </h1>
      <h2
        css={{
          fontFamily: `"Pretendard", sans-serif`,
          fontSize: "16px",
          fontWeight: 500,
          margin: "4px 0 0 0",
        }}
      >
        이메일 또는 아이디를 입력해주세요.
      </h2>

      {/* 폼 */}
      <form
        onSubmit={handleSubmit}
        css={{
          margin: "32px 0 0 0",
        }}
      >
        <TextField
          autoFocus
          disabled={loading}
          error={errorMessage !== undefined}
          helperText={errorMessage}
          label="이메일 또는 아이디"
          type="email username"
          value={loginData.identifier}
          autoComplete="email"
          onChange={(e) => loginDataDispatch({ identifier: e.target.value })}
          css={{
            width: "100%",
            margin: "16px 0 0 0",
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
        <Button startIcon={<HelpOutlineRoundedIcon />}>이메일을 잊어버렸어요.</Button>
      </div>
    </>
  );
}
