/** @jsxImportSource @emotion/react */

import { Paper, Typography, IconButton, Tooltip } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import Avatar from "components/common/Avatar";
import DeferredSkeleton from "components/common/DeferredSkeleton";

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
        <Avatar
          profileImage={profilePreview?.profileImage}
          name={profilePreview?.name}
          username={profilePreview?.username}
        />
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
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Typography
            component={"div"}
            css={{
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            {profilePreview ? (
              profilePreview.username || "이름 없음"
            ) : (
              <DeferredSkeleton animation="wave" width="64px" />
            )}
          </Typography>

          <Typography
            component={"div"}
            css={{
              fontSize: "12px",
              fontWeight: 500,
              color: "gray",
            }}
          >
            {profilePreview ? `@${profilePreview.name}` : <DeferredSkeleton animation="wave" width="32px" />}
          </Typography>
        </div>
        <Typography
          component={"div"}
          css={{
            fontSize: "14px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {profilePreview ? profilePreview.bio ?? "소개가 등록되지 않았어요." : <DeferredSkeleton animation="wave" />}
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
