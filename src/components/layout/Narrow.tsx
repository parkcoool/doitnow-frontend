/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";

const narrowStyle = css({
  width: "calc(100% - 40px)",
  margin: "0 auto",
  "@media (min-width: 480px)": {
    width: "calc(480px - 40px)",
  },
});

interface NarrowProps {
  children: React.ReactNode;
}

export default function Narrow({ children }: NarrowProps) {
  return <div css={narrowStyle}>{children}</div>;
}
