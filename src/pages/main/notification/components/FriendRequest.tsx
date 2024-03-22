/** @jsxImportSource @emotion/react */

import React from "react";

import ButtonBase from "@mui/material/ButtonBase";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

interface FriendRequestProps {
  id: number;
  text: string;
  link: string;
  read: boolean;
  createdAt: string;
}

export default function FriendRequest({ id, text, link, read, createdAt }: FriendRequestProps) {
  return <div></div>;
}
