/** @jsxImportSource @emotion/react */

import { Paper, Avatar, Skeleton, Typography, IconButton, Tooltip } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import type { ProfilePreview } from "user";

interface ProfileProps {
  myProfilePreview?: ProfilePreview;
  onMyProfileViewClick: () => void;
}

export default function Profile({ myProfilePreview, onMyProfileViewClick }: ProfileProps) {
  return (
    <Paper
      css={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "16px",
      }}
    >
      {/* 프로필 사진 */}
      <div>
        {myProfilePreview ? (
          <Avatar src={myProfilePreview.profileImage ?? undefined} />
        ) : (
          <Skeleton variant="circular" width={40} height={40} animation="wave" />
        )}
      </div>

      {/* 이름 및 소개 */}
      <div
        css={{
          width: "100%",
        }}
      >
        <Typography
          css={{
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          {myProfilePreview ? myProfilePreview.name : <Skeleton animation="wave" />}
        </Typography>
        <Typography
          css={{
            fontSize: "14px",
          }}
        >
          {myProfilePreview ? myProfilePreview.bio ?? "소개가 등록되지 않았어요." : <Skeleton animation="wave" />}
        </Typography>
      </div>

      {/* 버튼 */}
      <Tooltip title="내 프로필 보기">
        <IconButton onClick={onMyProfileViewClick}>
          <ArrowForwardIosRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Paper>
  );
}
