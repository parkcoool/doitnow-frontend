/** @jsxImportSource @emotion/react */

import { Typography } from "@mui/material";

interface FieldsetTitleProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

export default function FieldsetTitle({ icon, title, subtitle }: FieldsetTitleProps) {
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

      {subtitle && (
        <Typography
          css={{
            fontSize: "14px",
            color: "var(--secondary-text)",
          }}
        >
          {subtitle}
        </Typography>
      )}

      <hr />
    </div>
  );
}
