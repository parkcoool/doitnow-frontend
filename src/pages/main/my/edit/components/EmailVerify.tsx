/** @jsxImportSource @emotion/react */

import React from "react";

import { Button, CircularProgress, Grow, Paper, TextField, Typography } from "@mui/material";
import {
  ShieldRounded as ShieldRoundedIcon,
  CheckCircleRounded as CheckCircleRoundedIcon,
  SendRounded as SendRoundedIcon,
} from "@mui/icons-material";
import sendEmail from "apis/sendEmail";
import verifyEmail from "apis/verifyEmail";

interface Token {
  token: string;
  expiresIn: number;
}

interface EmailVerifyProps {
  email?: string;
  setEmailToken: React.Dispatch<React.SetStateAction<Token | undefined>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EmailVerify({ email, setEmailToken, loading, setLoading }: EmailVerifyProps) {
  const [emailSent, setEmailSent] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState<string>();

  React.useEffect(() => {
    setErrorMessage(undefined);
  }, [code]);

  async function handleSendEmail() {
    if (email === undefined || emailSent || loading) return;
    setLoading(true);

    const res = await sendEmail({ email });
    setLoading(false);
    if (res.status === 200) {
      setEmailSent(true);
    }
  }

  async function handleVerifyEmail(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();

    if (email === undefined || !emailSent || loading) return;
    setLoading(true);

    const res = await verifyEmail({ email, code });
    setLoading(false);
    if (res.status === 200) {
      setEmailToken(res.data.token);
    } else {
      setErrorMessage(res.data.message);
    }
  }

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 설명 */}
      <Typography
        variant="h1"
        css={{
          fontFamily: `"Pretendard", sans-serif`,
          fontSize: "24px",
          fontWeight: 700,
          margin: "16px 0 0 0",
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <ShieldRoundedIcon color="primary" fontSize="inherit" />
        이메일 주소 인증
      </Typography>
      <Typography
        variant="h2"
        color="text.secondary"
        css={{
          fontFamily: `"Pretendard", sans-serif`,
          fontSize: "16px",
          fontWeight: 500,
          margin: "4px 0 0 0",
        }}
      >
        계속하려면 이메일 주소를 인증해주세요.
      </Typography>

      {/* 이메일 */}
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          marginTop: "32px",
          width: "100%",
        }}
      >
        <Paper
          css={{
            width: "100%",
            padding: "16px",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            gap: "16px 8px",
          }}
        >
          <Typography
            fontWeight={500}
            css={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: "1",
            }}
          >
            {email}
          </Typography>

          <Button
            css={{
              minWidth: "112px",
            }}
            disabled={loading}
            variant="contained"
            disableElevation
            startIcon={
              loading ? (
                <CircularProgress size={16} color="inherit" />
              ) : emailSent ? (
                <CheckCircleRoundedIcon />
              ) : (
                <SendRoundedIcon />
              )
            }
            onClick={handleSendEmail}
            color={emailSent ? "success" : "primary"}
          >
            {emailSent ? "코드 보냄" : "인증 요청"}
          </Button>
        </Paper>
      </div>

      {/* 인증 */}
      <Grow in={emailSent}>
        <form
          onSubmit={handleVerifyEmail}
          css={{
            display: "flex",
            flexDirection: "row",
            gap: "4px",
            width: "100%",
            marginTop: "32px",
          }}
        >
          <span
            css={{
              flexGrow: "1",
            }}
          >
            <TextField
              label="인증 코드"
              error={errorMessage !== undefined}
              helperText={errorMessage}
              autoComplete="one-time-code"
              disabled={loading}
              onChange={(e) => setCode(e.currentTarget.value)}
              fullWidth
              autoFocus
            />
          </span>
          <Button
            type="submit"
            variant="contained"
            disableElevation
            endIcon={<ShieldRoundedIcon />}
            css={{
              minWidth: "84px",
              height: "56px",
            }}
          >
            인증
          </Button>
        </form>
      </Grow>
    </div>
  );
}
