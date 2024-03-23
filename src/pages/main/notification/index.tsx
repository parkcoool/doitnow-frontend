/** @jsxImportSource @emotion/react */

import React from "react";

import Button from "@mui/material/Button";
import ClearAllRoundedIcon from "@mui/icons-material/ClearAllRounded";
import CircularProgress from "@mui/material/CircularProgress";

import getNotifications from "apis/getNotifications";
import readNotification from "apis/readNotification";

import useSessionStore from "contexts/useSessionStore";
import useNotificationStore from "contexts/useNotificationStore";

import NotificationComponent from "./components/Notification";

import type { Notification } from "notification";

export default function Notification() {
  const setNotificationCount = useNotificationStore((state) => state.setCount);
  const session = useSessionStore();

  const [loading, setLoading] = React.useState(false);
  const [notifications, setNotifications] = React.useState<Notification[]>();

  React.useEffect(() => {
    (async function () {
      const accessToken = session.accessToken?.token;
      if (accessToken === undefined) return;

      setLoading(true);
      const res = await getNotifications({}, accessToken);

      setLoading(false);
      if (res.status !== 200) return;

      setNotifications(res.data.notifications);
    })();
  }, [session]);

  async function handleReadAll() {
    if (notifications === undefined) return;

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
    <>
      <div
        css={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "8px",
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 1,
        }}
      >
        <Button
          variant="outlined"
          onClick={handleReadAll}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ClearAllRoundedIcon />}
          disabled={loading}
        >
          모두 읽음 처리
        </Button>
      </div>
      <div>
        {notifications === undefined ? (
          <>
            <NotificationComponent />
            <NotificationComponent />
            <NotificationComponent />
            <NotificationComponent />
            <NotificationComponent />
          </>
        ) : (
          notifications.map((notification) => (
            <NotificationComponent
              key={notification.id}
              notification={notification}
              setNotifications={setNotifications}
            />
          ))
        )}
      </div>
    </>
  );
}
