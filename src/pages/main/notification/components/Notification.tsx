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

interface FriendRequestProps {
  id: number;
  text: string;
  link: string;
  read: boolean;
  type: string;
  createdAt: string;
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

export default function Notification({ id, text, link, read, type, createdAt }: FriendRequestProps) {
  const session = useSessionStore();
  const navigate = useNavigate();

  async function readThisNotification() {
    const { accessToken } = session;
    if (accessToken === null) return;

    await readNotification({ id }, accessToken.token);
  }

  function handleClick() {
    readThisNotification();
    navigate(link);
  }

  return (
    <ButtonBase
      css={{
        display: "flex",
        width: "100%",
        padding: "16px",
      }}
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
            fontSize="16px"
            color={read ? "text.secondary" : "primary"}
          >
            <TypeIcon type={type} />
            {getTypeString(type)}
          </Typography>

          <Typography
            css={{
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
            }}
            fontSize="14px"
            color="text.secondary"
          >
            {timeForToday(createdAt)}
          </Typography>
        </div>

        {/* 내용 */}
        <Typography
          css={{
            fontSize: "14px",
            fontWeight: 500,
            textAlign: "left",
          }}
          color={read ? "text.secondary" : "text.primary"}
        >
          {text}
        </Typography>
      </div>
      <ArrowForwardIosRoundedIcon fontSize="small" />
    </ButtonBase>
  );
}
