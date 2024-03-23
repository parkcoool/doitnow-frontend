/** @jsxImportSource @emotion/react */
import React from "react";
import { Snackbar, IconButton } from "@mui/material";

import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import CloseIcon from "@mui/icons-material/Close";

import acceptFriendRequest from "apis/acceptFriendRequest";
import cancelFriendRequest from "apis/cancelFriendRequest";
import requestFriend from "apis/requestFriend";
import deleteFriend from "apis/deleteFriend";

import useSessionStore from "contexts/useSessionStore";

import { FriendStatus } from "constant/friendStatus";

import ActionButton from "./ActionButton";
import ActionTypography from "./ActionTypography";

import type { PublicProfile } from "user";

interface FriendButtonProps {
  profile: PublicProfile | undefined;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FriendButton({ profile, loading, setLoading }: FriendButtonProps) {
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

  return profile ? (
    <>
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
