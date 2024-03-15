/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { HelpOutlineRounded as HelpOutlineRoundedIcon } from "@mui/icons-material";

import type { ReceivedData, SubmitData } from "..";

interface IdentifierProps {
  submitData: SubmitData;
  submitDataDispatch: React.Dispatch<Partial<SubmitData>>;
  receivedData: ReceivedData;
  loading: boolean;
  onSubmit: () => void;
}

export default function Identifier({
  submitData,
  submitDataDispatch,
  receivedData,
  loading,
  onSubmit,
}: IdentifierProps) {
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
        시작하기
      </h1>
      <h2
        css={{
          fontFamily: `"Pretendard", sans-serif`,
          fontSize: "16px",
          fontWeight: 500,
          margin: "4px 0 0 0",
        }}
      >
        이메일 주소 또는 아이디를 입력해주세요.
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
          label="이메일 주소 또는 아이디"
          type="text"
          value={submitData.identifier}
          autoComplete="username"
          onChange={(e) => submitDataDispatch({ identifier: e.target.value })}
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
          width: "100%",
          justifyContent: "center",
          margin: "16px 0 0 0",
        }}
      >
        <Button startIcon={<HelpOutlineRoundedIcon />} onClick={() => navigate("/auth/recovery")}>
          도움이 필요해요.
        </Button>
      </div>
    </>
  );
}
