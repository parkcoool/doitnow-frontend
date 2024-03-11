/** @jsxImportSource @emotion/react */

import React from "react";
import { TextField } from "@mui/material";

import type { EmailData } from "./";

interface NameProps {
  emailData: EmailData;
  emailDataDispatch: React.Dispatch<Partial<EmailData>>;
  errorMessage?: string;
  loading: boolean;
  onSubmit: () => void;
}

export default function Name({ emailData, emailDataDispatch, errorMessage, loading, onSubmit }: NameProps) {
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
        영어, 숫자, 밑줄(_)로만 이루어졌어요.
        <span
          css={{
            fontStyle: "italic",
          }}
        >
          (예: doitnow123_)
        </span>
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
          value={emailData.name}
          autoComplete="username"
          variant="standard"
          onChange={(e) => emailDataDispatch({ name: e.target.value })}
          css={{
            width: "100%",
            margin: "16px 0 0 0",
          }}
        />
      </form>
    </>
  );
}
