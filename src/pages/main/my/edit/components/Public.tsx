/** @jsxImportSource @emotion/react */

import React from "react";
import { Box, InputAdornment, Skeleton, TextField } from "@mui/material";
import { PublicRounded as PublicRoundedIcon } from "@mui/icons-material";

import FieldsetTitle from "./FieldsetTitle";

import type { FullProfile } from "user";

interface ProfileProps {
  profile: FullProfile | undefined;
  profileDispatch: React.Dispatch<Partial<FullProfile | undefined>>;
  loading: boolean;
}

export default function Public({ profile, profileDispatch, loading }: ProfileProps) {
  return (
    <div
      css={{
        marginTop: "36px",
      }}
    >
      <FieldsetTitle icon={<PublicRoundedIcon fontSize="inherit" />} title="공개 정보" />

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
            label="사용자 이름"
            value={profile?.username ?? ""}
            onChange={(e) => profileDispatch({ username: e.target.value })}
            disabled={loading}
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
            label="이름"
            value={profile?.name ?? ""}
            onChange={(e) => profileDispatch({ name: e.target.value })}
            disabled={loading}
            InputProps={{
              startAdornment: <InputAdornment position="start">@</InputAdornment>,
            }}
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
            disabled={loading}
            fullWidth
            multiline
            rows={3}
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
