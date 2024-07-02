/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";

import { Typography, Button } from "@mui/material";

import Avatar from "components/common/Avatar";

import type { UserSearchResult } from "./SearchBar";

interface SearchItemProps extends UserSearchResult {
  query: string;
}

export default function SearchItem({
  id,
  name,
  username,
  profileImage,
  query,
}: SearchItemProps) {
  const navigate = useNavigate();

  return (
    <Button
      fullWidth
      onClick={() => navigate(`/profile/${id}`)}
      color="inherit"
      css={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "4px 12px",
      }}
    >
      {/* 프로필 사진 */}
      <div>
        <Avatar profileImage={profileImage} name={name} username={username} />
      </div>

      {/* 이름 및 소개 */}
      <div
        css={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "flex-start",
          }}
        >
          <Typography
            component={"div"}
            css={{
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            {username}
          </Typography>

          <Typography
            component={"div"}
            css={{
              fontSize: "14px",
              color: "gray",
            }}
          >
            {name}
          </Typography>
        </div>
      </div>
    </Button>
  );
}
