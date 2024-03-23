import { Button, styled } from "@mui/material";
import type { ButtonProps } from "@mui/material/Button";

const ActionButton = styled(Button)<ButtonProps>({
  flexDirection: "column",
  gap: "2px",
  width: "100%",
});

export default ActionButton;
