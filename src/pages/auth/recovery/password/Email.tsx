/** @jsxImportSource @emotion/react */

import React from "react";
import { TextField } from "@mui/material";

import type { PasswordData } from "./";

interface EmailProps {
  passwordData: PasswordData;
  passwordDataDispatch: React.Dispatch<Partial<PasswordData>>;
  errorMessage?: string;
  loading: boolean;
  onSubmit: () => void;
}

export default function Email({ passwordData, passwordDataDispatch, errorMessage, loading, onSubmit }: EmailProps) {
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
          fontSize: "20px",
          fontWeight: 600,
          margin: "4px 0 0 0",
        }}
      >
        이메일 주소를 입력해주세요.
      </h1>

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
          label="이메일"
          type="email"
          value={passwordData.email}
          autoComplete="email"
          variant="standard"
          onChange={(e) => passwordDataDispatch({ email: e.target.value })}
          css={{
            width: "100%",
            margin: "16px 0 0 0",
          }}
        />
      </form>
    </>
  );
}
