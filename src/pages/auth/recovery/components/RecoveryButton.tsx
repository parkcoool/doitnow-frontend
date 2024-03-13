/** @jsxImportSource @emotion/react */

import styled from "@mui/system/styled";
import { Button } from "@mui/material";

import type { ButtonProps } from "@mui/material";

const RecoveryButton = styled(Button)<ButtonProps>(({ theme }) => ({
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  padding: "16px",
  fontSize: "16px",
  fontWeight: 500,
  justifyContent: "flex-start",
  color: theme.palette.text.primary,
}));

export default RecoveryButton;
