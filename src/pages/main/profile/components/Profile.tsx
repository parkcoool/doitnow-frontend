/** @jsxImportSource @emotion/react */

import { Avatar, Skeleton, Typography } from "@mui/material";

import type { Profile } from "user";

interface ProfileProps {
  profile: Profile | undefined;
}

export default function Profile({ profile }: ProfileProps) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 프로필 사진 */}
      <div
        css={{
          marginTop: "20px",
        }}
      >
        {profile ? (
          <Avatar
            src={profile.profileImage ?? undefined}
            css={{
              width: "80px",
              height: "80px",
            }}
          />
        ) : (
          <Skeleton variant="circular" width={80} height={80} animation="wave" />
        )}
      </div>

      {/* 이름 */}
      <Typography
        variant="h1"
        css={{
          fontSize: "28px",
          fontWeight: 700,
          marginTop: "18px",
        }}
      >
        {profile ? profile.name : <Skeleton width={200} animation="wave" />}
      </Typography>

      {/* 소개 */}
      <Typography
        variant="h2"
        css={{
          fontSize: "16px",
          marginTop: "8px",
          fontWeight: 400,
          color: "#818181",
        }}
      >
        {profile ? profile.bio ?? "소개가 등록되지 않았어요." : <Skeleton width={200} animation="wave" />}
      </Typography>
    </div>
  );
}
