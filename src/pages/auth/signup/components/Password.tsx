/** @jsxImportSource @emotion/react */

import React from "react";
import { TextField } from "@mui/material";

import type { SubmitData, ReceivedData } from "..";

interface PasswordProps {
  submitData: SubmitData;
  submitDataDispatch: React.Dispatch<Partial<SubmitData>>;
  receivedData: ReceivedData;
  loading: boolean;
  onSubmit: () => void;
}

export default function Password({ submitData, submitDataDispatch, receivedData, loading, onSubmit }: PasswordProps) {
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
          error={receivedData.errorMessage !== undefined}
          helperText={receivedData.errorMessage}
          label="비밀번호"
          type="password"
          value={submitData.password}
          autoComplete="new-password"
          variant="standard"
          onChange={(e) => submitDataDispatch({ password: e.target.value })}
          css={{
            width: "100%",
            margin: "16px 0 0 0",
          }}
        />

        <TextField
          disabled={loading}
          error={receivedData.errorMessage !== undefined}
          helperText={receivedData.errorMessage}
          label="비밀번호 확인"
          type="password"
          value={submitData.passwordConfirm}
          autoComplete="new-password"
          variant="standard"
          onChange={(e) => submitDataDispatch({ passwordConfirm: e.target.value })}
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
