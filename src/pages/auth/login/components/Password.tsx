/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Chip } from "@mui/material";
import {
  HelpOutlineRounded as HelpOutlineRoundedIcon,
  AccountCircleRounded as AccountCircleRoundedIcon,
} from "@mui/icons-material";

import { LoginStep } from "..";

import type { SubmitData, ReceivedData } from "..";

interface PasswordProps {
  submitData: SubmitData;
  submitDataDispatch: React.Dispatch<Partial<SubmitData>>;
  receivedData: ReceivedData;
  loading: boolean;
  onSubmit: () => void;
}

export default function Password({ submitData, submitDataDispatch, receivedData, loading, onSubmit }: PasswordProps) {
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
        {receivedData.name ? `${receivedData.name}님, 안녕하세요.` : "환영합니다."}
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
          label={submitData.identifier}
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
        <input
          type="text"
          name="identifier"
          autoComplete="username"
          value={submitData.identifier}
          readOnly
          css={{
            display: "none",
          }}
        />

        <TextField
          autoFocus
          disabled={loading}
          error={receivedData.errorMessage !== undefined}
          helperText={receivedData.errorMessage}
          label="비밀번호"
          type="password"
          value={submitData.password}
          autoComplete="current-password"
          onChange={(e) => submitDataDispatch({ password: e.target.value })}
          css={{
            width: "100%",
            margin: "0",
          }}
        />

        <input type="submit" hidden />
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
