/** @jsxImportSource @emotion/react */
import React from "react";

import DraftsRoundedIcon from "@mui/icons-material/DraftsRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Checkbox, IconButton, Tooltip, Typography } from "@mui/material";

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
  function handleCheckAll(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
    if (checked) setCheckedNotifications(notifications.map((notification) => notification.id));
    else setCheckedNotifications([]);
  }

  return (
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
                  <IconButton>
                    <DraftsRoundedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="삭제">
                  <IconButton>
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

      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </div>
  );
}
