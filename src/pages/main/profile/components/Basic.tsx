/** @jsxImportSource @emotion/react */
import { Skeleton, Typography } from "@mui/material";

import Avatar from "components/common/Avatar";

import type { PublicProfile } from "user";

interface BasicProps {
  profile: PublicProfile | undefined;
}

export default function Basic({ profile }: BasicProps) {
  return (
    <div
      css={{
        marginTop: "32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 프로필 이미지 */}
      {profile ? (
        <Avatar
          name={profile.name}
          username={profile.username}
          profileImage={profile.profileImage}
          css={{
            width: "80px",
            height: "80px",
          }}
        />
      ) : (
        <Skeleton variant="circular" width={80} height={80} animation="wave" />
      )}

      {/* 사용자 이름 */}
      <Typography
        variant="h1"
        css={{
          fontSize: "28px",
          fontWeight: 700,
          marginTop: "18px",
        }}
      >
        {profile ? profile.username : <Skeleton width={200} animation="wave" />}
      </Typography>

      {/* 이름 */}
      <Typography
        variant="h2"
        css={{
          fontSize: "14px",
          fontWeight: 500,
          color: "#818181",
        }}
      >
        {profile ? `@${profile.name}` : <Skeleton width={200} animation="wave" />}
      </Typography>

      {/* 소개 */}
      <Typography
        variant="h2"
        css={{
          fontSize: "16px",
          marginTop: "24px",
          fontWeight: 400,
          color: "#818181",
        }}
      >
        {profile ? profile.bio ?? "소개가 등록되지 않았어요." : <Skeleton width={200} animation="wave" />}
      </Typography>
    </div>
  );
}
