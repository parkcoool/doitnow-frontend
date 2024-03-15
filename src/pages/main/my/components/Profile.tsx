/** @jsxImportSource @emotion/react */

import { Paper, Avatar, Skeleton, Typography } from "@mui/material";

import type { ProfilePreview } from "user";

export default function Profile({ myProfilePreview }: { myProfilePreview?: ProfilePreview }) {
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
    </Paper>
  );
}
