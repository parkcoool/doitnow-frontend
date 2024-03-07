/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

interface HeaderProps {
  content?: React.ReactNode;
}

export default function Header({ content }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "16px",
        height: "52px",
        padding: "0 8px",
        backgroundColor: "white",
      }}
    >
      <span
        css={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackRoundedIcon htmlColor="black" />
        </IconButton>
      </span>
      <span
        css={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          height: "100%",
          fontSize: "18px",
          fontWeight: 600,
          fontFamily: `"Pretendard", sans-serif`,
        }}
      >
        {content}
      </span>
    </header>
  );
}
