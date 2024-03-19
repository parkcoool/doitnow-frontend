/** @jsxImportSource @emotion/react */

import React from "react";
import { Button, Dialog, Skeleton, TextField, Typography } from "@mui/material";
import { ShieldRounded as ShieldRoundedIcon, CheckCircleRounded as CheckCircleRoundedIcon } from "@mui/icons-material";

import EmailVerify from "./EmailVerify";
import type { PrivateData } from "..";

interface Token {
  token: string;
  expiresIn: number;
}
interface PrivateProps {
  initialPrivateData: PrivateData | undefined;
  privateData: PrivateData | undefined;
  privateDataDispatch: React.Dispatch<Partial<PrivateData | undefined>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Private({
  initialPrivateData,
  privateData,
  privateDataDispatch,
  loading,
  setLoading,
}: PrivateProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [emailToken, setEmailToken] = React.useState<Token>();

  const emailVerified =
    privateData?.verifiedEmail?.email === privateData?.email || initialPrivateData?.email === privateData?.email;

  function handleDialogOpen() {
    if (emailVerified) return;
    setDialogOpen(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
  }

  return (
    <>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div>
          <div
            css={{
              display: "flex",
              flexDirection: "row",
              gap: "4px",
            }}
          >
            <span
              css={{
                flexGrow: "1",
              }}
            >
              {privateData ? (
                <TextField
                  label="이메일"
                  value={privateData?.email}
                  onChange={(e) => privateDataDispatch({ email: e.target.value.trim() })}
                  disabled={loading}
                  autoComplete="email"
                  fullWidth
                  required
                />
              ) : (
                <Skeleton>
                  <TextField fullWidth required />
                </Skeleton>
              )}
            </span>

            <Button
              css={{
                minWidth: "112px",
              }}
              variant="contained"
              disableElevation
              startIcon={emailVerified ? <CheckCircleRoundedIcon /> : <ShieldRoundedIcon />}
              color={emailVerified ? "success" : "primary"}
              onClick={handleDialogOpen}
            >
              {emailVerified ? "인증 완료" : "인증 요청"}
            </Button>
          </div>

          <Typography variant="caption" color="text.secondary">
            이메일 주소를 수정하려면 수정된 이메일 주소를 인증받아야 해요.
          </Typography>
        </div>
      </div>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <div
          css={{
            padding: "24px",
          }}
        >
          <EmailVerify
            email={privateData?.email}
            setEmailToken={setEmailToken}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </Dialog>
    </>
  );
}
