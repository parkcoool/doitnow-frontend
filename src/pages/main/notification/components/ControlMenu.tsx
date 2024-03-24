import React from "react";
import { ListItemIcon, ListItemText, MenuItem, Menu } from "@mui/material";
import DraftsRoundedIcon from "@mui/icons-material/DraftsRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import deleteNotification from "apis/deleteNotification";
import readNotification from "apis/readNotification";

import useSessionStore from "contexts/useSessionStore";
import useNotificationStore from "contexts/useNotificationStore";

import type { MenuProps } from "@mui/material";
import type { Notification } from "notification";

interface ControlMenuProps extends MenuProps {
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  setCheckedNotifications: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function ControlMenu({ setNotifications, setCheckedNotifications, ...props }: ControlMenuProps) {
  const session = useSessionStore();
  const setNotificationCount = useNotificationStore((state) => state.setCount);

  const [loading, setLoading] = React.useState<boolean>(false);

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
    setCheckedNotifications([]);
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
    <Menu {...props}>
      <MenuItem onClick={handleReadAll}>
        <ListItemIcon>
          <DraftsRoundedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>모두 읽음 처리하기</ListItemText>
      </MenuItem>

      <MenuItem onClick={handleDeleteAll}>
        <ListItemIcon>
          <DeleteRoundedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>모두 삭제하기</ListItemText>
      </MenuItem>
    </Menu>
  );
}
