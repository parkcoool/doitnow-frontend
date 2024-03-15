/** @jsxImportSource @emotion/react */

import { Paper, Avatar, Skeleton, Typography } from "@mui/material";

import type { MyData } from "..";

export default function Profile({ myData }: { myData?: MyData }) {
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
        {myData ? (
          <Avatar src={myData.profileImage} />
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
          {myData ? myData.name ?? "이름 없음" : <Skeleton animation="wave" />}
        </Typography>
        <Typography
          css={{
            fontSize: "14px",
          }}
        >
          {myData ? myData.bio ?? "소개가 등록되지 않았어요." : <Skeleton animation="wave" />}
        </Typography>
      </div>
    </Paper>
  );
}
