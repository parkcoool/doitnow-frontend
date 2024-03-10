/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  HelpOutlineRounded as HelpOutlineRoundedIcon,
  AccessTimeRounded as AccessTimeRoundedIcon,
} from "@mui/icons-material";
import { Chip, TextField, Button } from "@mui/material";

import type { SignupData } from "./";

interface VerifyProps {
  signupData: SignupData;
  signupDataDispatch: React.Dispatch<Partial<SignupData>>;
  errorMessage?: string;
  loading: boolean;
  onSubmit: () => void;
}

export default function Verify({ signupData, signupDataDispatch, errorMessage, loading, onSubmit }: VerifyProps) {
  const navigate = useNavigate();

  // 남은 시간을 관리한다.
  const [leftSeconds, setLeftSeconds] = React.useState<number | undefined>(undefined);

  // 남은 시간을 1초마다 업데이트한다.
  React.useEffect(() => {
    if (signupData.emailExpiresAt === undefined) return;

    function updateLeftSeconds() {
      const leftMilliseconds = (signupData.emailExpiresAt as Date).getTime() - new Date().getTime();
      setLeftSeconds(Math.floor(((signupData.emailExpiresAt as Date).getTime() - new Date().getTime()) / 1000));
    }
    updateLeftSeconds();

    const interval = setInterval(updateLeftSeconds, 1000);

    return () => clearInterval(interval);
  }, [signupData.emailExpiresAt]);

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
        이메일로 전송된 코드를 입력해주세요.
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
        <span
          css={{
            fontWeight: 600,
          }}
        >
          {signupData.email}
        </span>
        (으)로 보냈어요.
      </h2>

      {/* 남은 시간 */}
      {leftSeconds && (
        <div
          css={{
            margin: "32px 0 0 0",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Chip
            icon={<AccessTimeRoundedIcon />}
            label={`${Math.floor(leftSeconds / 60)}:${(leftSeconds % 60).toString().padStart(2, "0")}`}
            variant="outlined"
          />
        </div>
      )}

      {/* 폼 */}
      <form onSubmit={handleSubmit}>
        <TextField
          autoFocus
          disabled={loading}
          error={errorMessage !== undefined}
          helperText={errorMessage}
          label="인증 코드"
          type="text"
          value={signupData.emailCode ?? ""}
          autoComplete="off"
          variant="standard"
          onChange={(e) => signupDataDispatch({ emailCode: e.target.value })}
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
        <Button startIcon={<HelpOutlineRoundedIcon />} onClick={() => navigate(-1)}>
          이메일 주소를 잘못 입력했어요.
        </Button>
      </div>
    </>
  );
}
