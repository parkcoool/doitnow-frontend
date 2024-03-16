/** @jsxImportSource @emotion/react */

import React from "react";
import { Box, Skeleton, TextField } from "@mui/material";
import { PublicRounded as PublicRoundedIcon } from "@mui/icons-material";

import FieldsetTitle from "./FieldsetTitle";

import type { FullProfile } from "user";

interface ProfileProps {
  profile: FullProfile | undefined;
  profileDispatch: React.Dispatch<Partial<FullProfile | undefined>>;
}

export default function Public({ profile, profileDispatch }: ProfileProps) {
  return (
    <div
      css={{
        marginTop: "36px",
      }}
    >
      <FieldsetTitle
        icon={<PublicRoundedIcon fontSize="inherit" />}
        title="공개 정보"
        subtitle="이 정보는 모든 사용자가 볼 수 있어요."
      />

      <Box
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          padding: "24px 0",
        }}
      >
        {profile ? (
          <TextField
            label="이름"
            value={profile?.name ?? ""}
            onChange={(e) => profileDispatch({ name: e.target.value })}
            fullWidth
            required
          />
        ) : (
          <Skeleton>
            <TextField fullWidth required />
          </Skeleton>
        )}

        {profile ? (
          <TextField
            label="소개"
            value={profile?.bio ?? ""}
            onChange={(e) => profileDispatch({ bio: e.target.value })}
            fullWidth
            multiline
            minRows={3}
          />
        ) : (
          <Skeleton>
            <TextField fullWidth multiline minRows={3} />
          </Skeleton>
        )}
      </Box>
    </div>
  );
}
