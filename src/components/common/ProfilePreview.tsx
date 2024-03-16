/** @jsxImportSource @emotion/react */

import { Paper, Avatar, Skeleton, Typography, IconButton, Tooltip } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import stringToColor from "utils/common/stringToColor";

import type { SmallProfile } from "user";

interface ProfileProps {
  profilePreview?: SmallProfile;
  onClick?: () => void;
}

export default function ProfilePreview({ profilePreview, onClick }: ProfileProps) {
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
        {profilePreview ? (
          <Avatar
            src={profilePreview.profileImage ?? undefined}
            css={{ backgroundColor: stringToColor(profilePreview.name) }}
          >
            {!profilePreview.profileImage && profilePreview.name.length >= 1 && profilePreview.name[0].toUpperCase()}
          </Avatar>
        ) : (
          <Skeleton variant="circular" width={40} height={40} animation="wave" />
        )}
      </div>

      {/* 이름 및 소개 */}
      <div
        css={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Typography
          css={{
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          {profilePreview ? profilePreview.name || "이름 없음" : <Skeleton animation="wave" />}
        </Typography>
        <Typography
          css={{
            fontSize: "14px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {profilePreview ? profilePreview.bio ?? "소개가 등록되지 않았어요." : <Skeleton animation="wave" />}
        </Typography>
      </div>

      {/* 버튼 */}
      {onClick && (
        <Tooltip title="자세한 프로필 보기">
          <IconButton onClick={onClick}>
            <ArrowForwardIosRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Paper>
  );
}
