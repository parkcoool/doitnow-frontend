/** @jsxImportSource @emotion/react */
import { Button, styled } from "@mui/material";

import type { ButtonProps } from "@mui/material";

const FriendButton = styled(Button)<ButtonProps>({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "4px",
  borderRadius: "8px",
  padding: "4px 8px",
});

export default FriendButton;
