/** @jsxImportSource @emotion/react */

import React from "react";
import Button from "@mui/material/Button";
import ClearAllRoundedIcon from "@mui/icons-material/ClearAllRounded";

import useSessionStore from "contexts/useSessionStore";
import getNotifications from "apis/getNotifications";
import readNotification from "apis/readNotification";

import NotificationComponent from "./components/Notification";

import type { Notification } from "notification";

export default function Notification() {
  const session = useSessionStore();

  const [notifications, setNotifications] = React.useState<Notification[]>();

  React.useEffect(() => {
    (async function () {
      const accessToken = session.accessToken?.token;
      if (accessToken === undefined) return;

      const res = await getNotifications({}, accessToken);
      if (res.status !== 200) return;

      setNotifications(res.data.notifications);
    })();
  }, [session]);

  async function handleReadAll() {
    const { accessToken } = session;
    if (accessToken === null) return;

    await readNotification({}, accessToken.token);
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
        <Button variant="outlined" onClick={handleReadAll} startIcon={<ClearAllRoundedIcon />}>
          모두 읽음 처리
        </Button>
      </div>
      <div>
        {notifications?.map((notification) => <NotificationComponent key={notification.id} {...notification} />)}
      </div>
    </>
  );
}
