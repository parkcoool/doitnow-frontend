/** @jsxImportSource @emotion/react */

import React from "react";

import DeferredView from "components/common/DeferredView";

import NotificationList from "./components/NotificationList";

import ControlBar from "./components/ControlBar";
import type { Notification } from "notification";

export default function Notification() {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [checkedNotifications, setCheckedNotifications] = React.useState<number[]>([]);

  return (
    <DeferredView loaded={true}>
      <div
        css={{
          position: "sticky",
          top: 0,
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
          zIndex: 1,
        }}
      >
        <ControlBar
          notifications={notifications}
          setNotifications={setNotifications}
          checkedNotifications={checkedNotifications}
          setCheckedNotifications={setCheckedNotifications}
        />
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
