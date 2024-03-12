/** @jsxImportSource @emotion/react */

import React from "react";
import { TextField } from "@mui/material";

import type { SignupData } from "..";

interface NameProps {
  signupData: SignupData;
  signupDataDispatch: React.Dispatch<Partial<SignupData>>;
  errorMessage?: string;
  loading: boolean;
  onSubmit: () => void;
}

export default function Name({ signupData, signupDataDispatch, errorMessage, loading, onSubmit }: NameProps) {
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
        아이디를 입력해주세요.
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
        영어, 숫자, 밑줄(_)만 쓸 수 있고, 3자 이상 20자 이하여야 해요.
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
          label="아이디"
          type="text"
          value={signupData.name}
          autoComplete="username"
          variant="standard"
          onChange={(e) => signupDataDispatch({ name: e.target.value })}
          css={{
            width: "100%",
            margin: "16px 0 0 0",
          }}
        />
      </form>
    </>
  );
}
