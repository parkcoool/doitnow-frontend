/** @jsxImportSource @emotion/react */

import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";

interface BottomButtonProps {
  primaryText: string;
  secondaryText?: string;
  primaryButtonProps: ButtonProps;
  secondaryButtonProps?: ButtonProps;
}

export default function BottomButton({
  primaryText,
  secondaryText,
  primaryButtonProps,
  secondaryButtonProps = {},
}: BottomButtonProps) {
  return (
    <div
      css={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        padding: "16px",
      }}
    >
      {secondaryText && (
        <Button {...secondaryButtonProps} size="small">
          {secondaryText}
        </Button>
      )}

      <Button
        {...primaryButtonProps}
        variant="contained"
        css={{
          width: "100%",
          height: "48px",
          borderRadius: "18px",
        }}
      >
        {primaryText}
      </Button>
    </div>
  );
}
