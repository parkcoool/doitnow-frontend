/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ErrorOutlineRounded as ErrorOutlineRoundedIcon,
  AccessTimeRounded as AccessTimeRoundedIcon,
} from "@mui/icons-material";
import {
  Chip,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import type { SubmitData, ReceivedData } from "..";

interface VerifyProps {
  submitData: SubmitData;
  submitDataDispatch: React.Dispatch<Partial<SubmitData>>;
  receivedData: ReceivedData;
  loading: boolean;
  onSubmit: () => void;
}

export default function Verify({ submitData, submitDataDispatch, receivedData, loading, onSubmit }: VerifyProps) {
  const navigate = useNavigate();

  // 남은 시간과 다이얼로그를 관리한다.
  const [leftSeconds, setLeftSeconds] = React.useState<number | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  function handleDialogClose() {
    setDialogOpen(false);
    navigate(-1);
  }

  // 남은 시간이 0 이하인 경우
  function handleTimeout() {
    if (loading) return;

    setLeftSeconds(0);
    setDialogOpen(true);
  }

  function updateLeftSeconds() {
    if (receivedData.emailCodeExpiresAt === undefined) return;

    const leftMilliseconds = receivedData.emailCodeExpiresAt.getTime() - new Date().getTime();

    setLeftSeconds(Math.floor(leftMilliseconds / 1000));
  }

  // 남은 시간을 1초마다 업데이트한다.
  React.useEffect(() => {
    if (receivedData.emailCodeExpiresAt === undefined) return;

    function updateLeftSeconds() {
      const leftMilliseconds = (receivedData.emailCodeExpiresAt as Date).getTime() - new Date().getTime();

      // 남은 시간이 0 이하인 경우
      if (leftMilliseconds <= 0) {
        handleTimeout();
        return;
      }

      setLeftSeconds(Math.floor(leftMilliseconds / 1000));
    }
    updateLeftSeconds();

    const interval = setInterval(updateLeftSeconds, 1000);

    return () => clearInterval(interval);
  }, [receivedData.emailCodeExpiresAt]);

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
          {submitData.email}
        </span>
        (으)로 보냈어요.
      </h2>

      {/* 남은 시간 */}
      {leftSeconds !== undefined && (
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
          error={receivedData.errorMessage !== undefined}
          helperText={receivedData.errorMessage}
          label="인증 코드"
          type="text"
          value={submitData.emailCode}
          autoComplete="one-time-code"
          variant="standard"
          onChange={(e) => submitDataDispatch({ emailCode: e.target.value })}
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
        <Button startIcon={<ErrorOutlineRoundedIcon />} onClick={() => navigate(-1)}>
          이메일 주소를 다시 입력할래요.
        </Button>
      </div>

      {/* 다이얼로그 */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle
          css={{
            fontSize: "20px",
            fontWeight: 600,
          }}
        >
          인증 코드 유효 시간이 만료되었어요.
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            css={{
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            인증 코드 유효 시간이 만료되었어요. 이메일 주소를 다시 입력해주세요.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
