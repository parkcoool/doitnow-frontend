/** @jsxImportSource @emotion/react */

import React from "react";
import { TextField } from "@mui/material";

import type { SignupData } from "..";

interface PasswordProps {
  signupData: SignupData;
  signupDataDispatch: React.Dispatch<Partial<SignupData>>;
  errorMessage?: string;
  loading: boolean;
  onSubmit: () => void;
}

export default function Password({ signupData, signupDataDispatch, errorMessage, loading, onSubmit }: PasswordProps) {
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
        비밀번호를 입력해주세요.
      </h1>

      <h2
        css={{
          fontFamily: `"Pretendard", sans-serif`,
          fontSize: "14px",
          fontWeight: 400,
          margin: "4px 0 0 0",
          color: "#666",
        }}
      >
        영어, 숫자를 조합하여 8자 이상, 20자 이하여야 해요.
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
          label="비밀번호"
          type="password"
          value={signupData.password}
          autoComplete="new-password"
          variant="standard"
          onChange={(e) => signupDataDispatch({ password: e.target.value })}
          css={{
            width: "100%",
            margin: "16px 0 0 0",
          }}
        />

        <TextField
          disabled={loading}
          error={errorMessage !== undefined}
          helperText={errorMessage}
          label="비밀번호 확인"
          type="password"
          value={signupData.passwordConfirm}
          autoComplete="new-password"
          variant="standard"
          onChange={(e) => signupDataDispatch({ passwordConfirm: e.target.value })}
          css={{
            width: "100%",
            margin: "16px 0 0 0",
          }}
        />

        <input type="submit" hidden />
      </form>
    </>
  );
}
