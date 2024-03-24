/** @jsxImportSource @emotion/react */

import React from "react";

import Button from "@mui/material/Button";
import ClearAllRoundedIcon from "@mui/icons-material/ClearAllRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";

import readNotification from "apis/readNotification";
import deleteNotification from "apis/deleteNotification";

import useSessionStore from "contexts/useSessionStore";
import useNotificationStore from "contexts/useNotificationStore";

import DeferredView from "components/common/DeferredView";

import NotificationList from "./components/NotificationList";

import type { Notification } from "notification";

export default function Notification() {
  const setNotificationCount = useNotificationStore((state) => state.setCount);
  const session = useSessionStore();

  const [loading, setLoading] = React.useState(false);
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [checkedNotifications, setCheckedNotifications] = React.useState<number[]>([]);

  // 모두 삭제
  async function handleDeleteAll() {
    if (loading) return;

    const { accessToken } = session;
    if (accessToken === null) return;

    setLoading(true);
    const res = await deleteNotification({}, accessToken.token);

    setLoading(false);
    if (res.status !== 200) return;

    // 상태 삭제 처리
    setNotifications([]);
    setNotificationCount(0);
  }

  // 모두 읽기 처리
  async function handleReadAll() {
    if (loading) return;

    const { accessToken } = session;
    if (accessToken === null) return;

    setLoading(true);
    const res = await readNotification({}, accessToken.token);

    setLoading(false);
    if (res.status !== 200) return;

    // 상태 읽음 처리
    setNotifications((prev) => prev?.map((notification) => ({ ...notification, read: true })));
    setNotificationCount(0);
  }

  return (
    <DeferredView loaded={true}>
      <div
        css={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "8px",
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 1,
          gap: "8px",
        }}
      >
        <Button variant="outlined" onClick={handleDeleteAll} startIcon={<DeleteSweepRoundedIcon />} disabled={loading}>
          모두 삭제
        </Button>

        <Button variant="outlined" onClick={handleReadAll} startIcon={<ClearAllRoundedIcon />} disabled={loading}>
          모두 읽기
        </Button>
      </div>

      <NotificationList
        notifications={notifications}
        setNotifications={setNotifications}
        checkedNotifications={checkedNotifications}
        setCheckedNotifications={setCheckedNotifications}
      />
    </DeferredView>
  );
}
