/** @jsxImportSource @emotion/react */

import { Avatar, Paper, Skeleton, Typography } from "@mui/material";
import { DateRangeRounded as DateRangeRoundedIcon } from "@mui/icons-material";
import styled from "@emotion/styled";

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
            src={profile.profileImage ?? undefined}
            css={{
              width: "80px",
              height: "80px",
            }}
          />
        ) : (
          <Skeleton variant="circular" width={80} height={80} animation="wave" />
        )}

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
