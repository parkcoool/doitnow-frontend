import { css } from "@emotion/react";

import type { Theme } from "@mui/material";

export const formContainerStyle = (theme: Theme) =>
  css({
    width: "90%",
    display: "flex",
    margin: "24px auto",
    padding: "50px 30px",
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: "10px",
    overflow: "hidden",
  });
