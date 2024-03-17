/** @jsxImportSource @emotion/react */

import { Typography } from "@mui/material";

interface FieldsetTitleProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
}

export default function FieldsetTitle({ icon, title }: FieldsetTitleProps) {
  return (
    <div>
      <Typography
        css={{
          display: "flex",
          alignItems: "center",
          fontWeight: 600,
          fontSize: "18px",
        }}
      >
        {icon && (
          <span
            css={{
              marginRight: "8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {icon}
          </span>
        )}
        {title}
      </Typography>

      <hr />
    </div>
  );
}
