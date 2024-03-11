/** @jsxImportSource @emotion/react */

import React from "react";
import { IconButton, Paper, Typography, Snackbar, Tooltip } from "@mui/material";
import { ContentPasteRounded as ContentPasteRoundedIcon, Close as CloseIcon } from "@mui/icons-material";

import type { EmailData } from "./";

interface CompleteProps {
  emailData: EmailData;
}

export default function Complete({ emailData }: CompleteProps) {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  function handleEmailCopy() {
    if (!emailData.email) return;

    navigator.clipboard.writeText(emailData.email);
    setSnackbarOpen(true);
  }

  function handleCloseSnackbar() {
    setSnackbarOpen(false);
  }

  const snackbarAction = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

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
        이메일 주소를 찾았어요.
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
        아래 이메일 주소로 지금 로그인해보세요.
      </h2>

      <Paper
        css={{
          position: "relative",
          margin: "32px 0 0 0",
          padding: "24px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          css={{
            fontWeight: 600,
          }}
        >
          {emailData.email}
        </Typography>

        <Tooltip title="이메일 주소 복사">
          <IconButton
            size="small"
            onClick={handleEmailCopy}
            css={{
              position: "absolute",
              right: "8px",
              top: "8px",
            }}
          >
            <ContentPasteRoundedIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        action={snackbarAction}
        css={{
          bottom: "80px",
        }}
        message="이메일 주소를 복사했어요."
      />
    </>
  );
}
