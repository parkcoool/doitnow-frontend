/** @jsxImportSource @emotion/react */
import React from "react";

import { Button, Divider, IconButton, Paper, Snackbar, Typography, styled } from "@mui/material";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import CloseIcon from "@mui/icons-material/Close";

import useSessionStore from "contexts/useSessionStore";

import acceptFriendRequest from "apis/acceptFriendRequest";
import cancelFriendRequest from "apis/cancelFriendRequest";
import requestFriend from "apis/requestFriend";
import deleteFriend from "apis/deleteFriend";

import { FriendStatus } from "constant/friendStatus";
import type { ButtonProps } from "@mui/material/Button";
import type { TypographyProps } from "@mui/material/Typography";
import type { PublicProfile } from "user";

interface ActionsProps {
  profile: PublicProfile | undefined;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActionButton = styled(Button)<ButtonProps>({
  flexDirection: "column",
  gap: "2px",
  width: "100%",
});

const ActionTypography = styled(Typography)<TypographyProps>({
  fontSize: "14px",
  fontWeight: 500,
});

export default function Actions({ profile, loading, setLoading }: ActionsProps) {
  const session = useSessionStore();

  const [message, setMessage] = React.useState("");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  // 스낵바 닫기 이벤트 핸들러
  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  async function handleAcceptFriendRequest() {
    const accessToken = session.accessToken?.token;
    if (profile === undefined || accessToken === undefined) return;

    setLoading(true);
    const res = await acceptFriendRequest({ from: profile.id }, accessToken);

    if (res.status === 200) profile.friendStatus = FriendStatus.ACCEPTED;

    setLoading(false);
    setMessage(res.data.message);
    setSnackbarOpen(true);
  }

  async function handleDeleteFriend() {
    const accessToken = session.accessToken?.token;
    if (profile === undefined || accessToken === undefined) return;

    setLoading(true);
    const res = await deleteFriend({ to: profile.id }, accessToken);

    if (res.status === 200) profile.friendStatus = null;

    setLoading(false);
    setMessage(res.data.message);
    setSnackbarOpen(true);
  }

  async function handleRequestFriend() {
    const accessToken = session.accessToken?.token;
    if (profile === undefined || accessToken === undefined) return;

    setLoading(true);
    const res = await requestFriend({ to: profile.id }, accessToken);

    if (res.status === 200) profile.friendStatus = FriendStatus.PENDING;

    setLoading(false);
    setMessage(res.data.message);
    setSnackbarOpen(true);
  }

  async function handleCancelFriendRequest() {
    const accessToken = session.accessToken?.token;
    if (profile === undefined || accessToken === undefined) return;

    setLoading(true);
    const res = await cancelFriendRequest({ to: profile.id }, accessToken);

    if (res.status === 200) profile.friendStatus = null;

    setLoading(false);
    setMessage(res.data.message);
    setSnackbarOpen(true);
  }

  return profile !== undefined && session.user?.id !== profile.id ? (
    <>
      <Paper
        css={{
          height: "72px",
          width: "100%",
          marginTop: "24px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {profile.friendStatus === FriendStatus.ACCEPTED && (
          <ActionButton disabled={loading} onClick={handleDeleteFriend}>
            <PersonRemoveRoundedIcon />
            <ActionTypography>친구 삭제</ActionTypography>
          </ActionButton>
        )}

        {profile.friendStatus === FriendStatus.PENDING && (
          <ActionButton disabled={loading} onClick={handleCancelFriendRequest}>
            <PersonRemoveRoundedIcon />
            <ActionTypography>친구 요청 취소</ActionTypography>
          </ActionButton>
        )}

        {profile.friendStatus === FriendStatus.RECEIVED && (
          <ActionButton disabled={loading} onClick={handleAcceptFriendRequest}>
            <PersonAddRoundedIcon />
            <ActionTypography>친구 요청 수락</ActionTypography>
          </ActionButton>
        )}

        {profile.friendStatus === null && (
          <ActionButton disabled={loading} onClick={handleRequestFriend}>
            <PersonAddRoundedIcon />
            <ActionTypography>친구 요청</ActionTypography>
          </ActionButton>
        )}

        <Divider orientation="vertical" variant="middle" flexItem />

        <ActionButton disabled={loading}>
          <BlockRoundedIcon />
          <ActionTypography>차단</ActionTypography>
        </ActionButton>
      </Paper>

      <Snackbar
        css={{
          bottom: "64px",
          marginBottom: "16px",
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={message}
        action={
          <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  ) : null;
}
