/** @jsxImportSource @emotion/react */

import { Paper, Skeleton, Typography } from "@mui/material";
import { DateRangeRounded as DateRangeRoundedIcon } from "@mui/icons-material";
import styled from "@emotion/styled";

import Avatar from "components/common/Avatar";

import type { TypographyProps } from "@mui/material/Typography";
import type { PublicProfile } from "user";

const Detail = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignContent: "center",
  padding: "12px",
});

const DetailName = styled(Typography)<TypographyProps>({
  display: "flex",
  alignContent: "center",
  gap: "4px",
  fontWeight: 600,
});

interface ProfileProps {
  profile: PublicProfile | undefined;
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
      {/* 기본 정보 */}
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

      {/* 세부 정보 */}
      <Paper
        css={{
          width: "100%",
          marginTop: "24px",
        }}
      >
        <Detail>
          {profile ? (
            <>
              <DetailName>
                <DateRangeRoundedIcon />
                계정 생성
              </DetailName>
              <Typography>{profile.createdAt.toLocaleDateString()}</Typography>
            </>
          ) : (
            <Skeleton width="100%" animation="wave" />
          )}
        </Detail>
      </Paper>
    </div>
  );
}
