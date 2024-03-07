/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LinearProgress from "@mui/material/LinearProgress";

interface HeaderProps {
  content?: React.ReactNode;
  loading?: boolean;
}

export default function Header({ content, loading = false }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header>
      {/* 헤더 콘텐츠 */}
      <div
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
      </div>

      {/* 프로그레스 바 */}
      <div
        css={{
          height: "3px",
        }}
      >
        {loading && (
          <LinearProgress
            css={{
              height: "100%",
            }}
          />
        )}
      </div>
    </header>
  );
}
