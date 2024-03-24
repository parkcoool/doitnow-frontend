/** @jsxImportSource @emotion/react */
import React from "react";

import DraftsRoundedIcon from "@mui/icons-material/DraftsRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Checkbox, IconButton, Tooltip, Typography } from "@mui/material";

import deleteNotification from "apis/deleteNotification";
import readNotification from "apis/readNotification";

import useSessionStore from "contexts/useSessionStore";
import useNotificationStore from "contexts/useNotificationStore";

import ControlMenu from "./ControlMenu";

import type { Notification } from "notification";

interface ControlBarProps {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  checkedNotifications: number[];
  setCheckedNotifications: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function ControlBar({
  notifications,
  setNotifications,
  checkedNotifications,
  setCheckedNotifications,
}: ControlBarProps) {
  const session = useSessionStore();
  const setNotificationCount = useNotificationStore((state) => state.setCount);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

  function handleCheckAll(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
    if (checked) setCheckedNotifications(notifications.map((notification) => notification.id));
    else setCheckedNotifications([]);
  }

  function handleMoreClick(event: React.MouseEvent<HTMLButtonElement>) {
    setMenuAnchor(event.currentTarget);
    setMenuOpen((prev) => !prev);
  }

  function handleMoreClose() {
    setMenuOpen(false);
  }

  async function handleDelete() {
    if (loading) return;

    const { accessToken } = session;
    if (accessToken === null) return;

    setLoading(true);
    const res = await deleteNotification({ id: checkedNotifications }, accessToken.token);

    setLoading(false);
    if (res.status !== 200) return;

    // 상태 삭제 처리
    setNotifications((prev) => prev.filter((notification) => !checkedNotifications.includes(notification.id)));
    setCheckedNotifications((prev) => prev.filter((id) => !checkedNotifications.includes(id)));
  }

  async function handleRead() {
    if (loading) return;

    const { accessToken } = session;
    if (accessToken === null) return;

    setLoading(true);
    const res = await readNotification({ id: checkedNotifications }, accessToken.token);

    setLoading(false);
    if (res.status !== 200) return;

    // 상태 읽음 처리
    setNotifications((prev) =>
      prev.map((notification) =>
        checkedNotifications.includes(notification.id) ? { ...notification, read: true } : notification
      )
    );
  }

  return (
    <>
      <div
        css={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          padding: "0 16px",
        }}
      >
        <span
          css={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
          }}
        >
          <span>
            <Checkbox
              checked={checkedNotifications.length === notifications.length && notifications.length > 0}
              indeterminate={checkedNotifications.length > 0 && checkedNotifications.length < notifications.length}
              onChange={handleCheckAll}
            />
          </span>
          <span>
            {checkedNotifications.length > 0 && (
              <span
                css={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  css={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="읽기">
                    <IconButton onClick={handleRead}>
                      <DraftsRoundedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="삭제">
                    <IconButton onClick={handleDelete}>
                      <DeleteRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </span>

                <span>
                  <Typography fontWeight={500} fontSize="16px" color="text.secondary">
                    {checkedNotifications.length.toLocaleString()}개 선택됨
                  </Typography>
                </span>
              </span>
            )}
          </span>
        </span>

        <IconButton onClick={handleMoreClick}>
          <MoreVertIcon />
        </IconButton>
      </div>

      <ControlMenu
        setNotifications={setNotifications}
        setCheckedNotifications={setCheckedNotifications}
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={handleMoreClose}
      />
    </>
  );
}
