/** @jsxImportSource @emotion/react */

import React from "react";
import { InputAdornment, TextField } from "@mui/material";

import type { SubmitData, ReceivedData } from "..";

interface NameProps {
  submitData: SubmitData;
  submitDataDispatch: React.Dispatch<Partial<SubmitData>>;
  receivedData: ReceivedData;
  loading: boolean;
  onSubmit: () => void;
}

export default function Name({ submitData, submitDataDispatch, receivedData, loading, onSubmit }: NameProps) {
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
        이름을 입력해주세요.
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
          error={receivedData.errorMessage !== undefined}
          helperText={receivedData.errorMessage}
          label="이름"
          type="text"
          value={submitData.name}
          autoComplete="name"
          variant="standard"
          InputProps={{
            startAdornment: <InputAdornment position="start">@</InputAdornment>,
          }}
          onChange={(e) => submitDataDispatch({ name: e.target.value })}
          css={{
            width: "100%",
            margin: "16px 0 0 0",
          }}
        />
      </form>
    </>
  );
}
