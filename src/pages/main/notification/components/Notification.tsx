/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";

import ButtonBase from "@mui/material/ButtonBase";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Typography from "@mui/material/Typography";

import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

import timeForToday from "utils/common/timeForToday";

import readNotification from "apis/readNotification";

import useSessionStore from "contexts/useSessionStore";
import useNotificationStore from "contexts/useNotificationStore";

import DeferredSkeleton from "components/common/DeferredSkeleton";

import type { Notification } from "notification";

interface NotificationProps {
  notification?: Notification;
  setNotifications?: React.Dispatch<React.SetStateAction<Notification[]>>;
}

function getTypeString(type: string) {
  switch (type) {
    case "FRIEND_REQUEST":
      return "친구 요청";
    case "FRIEND_ACCEPTED":
      return "친구 수락";
    default:
      return "기타";
  }
}

function TypeIcon({ type }: { type: string }) {
  switch (type) {
    case "FRIEND_REQUEST":
      return <PersonAddRoundedIcon fontSize="inherit" />;
    case "FRIEND_ACCEPTED":
      return <HowToRegRoundedIcon fontSize="inherit" />;
    default:
      return <NotificationsRoundedIcon fontSize="inherit" />;
  }
}

export default function Notification({ notification, setNotifications }: NotificationProps) {
  const session = useSessionStore();
  const setNotificationCount = useNotificationStore((state) => state.setCount);
  const navigate = useNavigate();

  async function readThisNotification() {
    if (notification === undefined || setNotifications === undefined) return;
    if (notification.read) return;

    const { accessToken } = session;
    if (accessToken === null) return;

    const res = await readNotification({ id: notification.id }, accessToken.token);
    if (res.status !== 200) return;

    // notifications 상태 읽음 처리
    setNotifications((prev) => {
      if (prev === undefined) return prev;

      const index = prev.findIndex((n) => n.id === notification.id);
      if (index === -1) return prev;

      const newNotifications = [...prev];
      newNotifications[index] = { ...newNotifications[index], read: true };
      return newNotifications;
    });

    // 알림 개수 읽음 처리
    if (!notification.read) setNotificationCount((prev) => prev - 1);
  }

  function handleClick() {
    if (notification === undefined) return;

    readThisNotification();
    navigate(notification.link);
  }

  return (
    <ButtonBase
      css={{
        display: "flex",
        width: "100%",
        padding: "16px",
      }}
      disabled={notification === undefined}
      onClick={handleClick}
    >
      <div
        css={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {/* 상단 */}
        <div
          css={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <Typography
            css={{
              display: "flex",
              alignItems: "center",
              fontWeight: 600,
              gap: "8px",
            }}
            component={"div"}
            fontSize="16px"
            color={notification?.read ? "text.secondary" : "primary"}
          >
            {notification === undefined ? (
              <DeferredSkeleton width="100px" />
            ) : (
              <>
                <TypeIcon type={notification.type} />
                {getTypeString(notification.type)}
              </>
            )}
          </Typography>

          <Typography
            css={{
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
            }}
            component={"div"}
            fontSize="14px"
            color="text.secondary"
          >
            {notification === undefined ? <DeferredSkeleton width="50px" /> : timeForToday(notification.createdAt)}
          </Typography>
        </div>

        {/* 내용 */}
        <Typography
          css={{
            fontSize: "14px",
            fontWeight: 500,
            textAlign: "left",
          }}
          component={"div"}
          color={notification?.read ? "text.secondary" : "text.primary"}
        >
          {notification === undefined ? <DeferredSkeleton /> : notification.text}
        </Typography>
      </div>
      {notification !== undefined && <ArrowForwardIosRoundedIcon fontSize="small" />}
    </ButtonBase>
  );
}
