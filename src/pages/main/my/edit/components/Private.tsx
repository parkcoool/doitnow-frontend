/** @jsxImportSource @emotion/react */

import React from "react";
import { Box, Skeleton, TextField } from "@mui/material";
import { LockRounded as LockRoundedIcon } from "@mui/icons-material";

import type { FullProfile } from "user";

interface PrivateProps {
  profile: FullProfile | undefined;
  profileDispatch: React.Dispatch<Partial<FullProfile | undefined>>;
  loading: boolean;
}

export default function Private({ profile, profileDispatch, loading }: PrivateProps) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {profile ? (
        <TextField
          label="이메일"
          value={profile?.email}
          onChange={(e) => profileDispatch({ email: e.target.value })}
          disabled={loading}
          fullWidth
          required
        />
      ) : (
        <Skeleton>
          <TextField fullWidth required />
        </Skeleton>
      )}
    </div>
  );
}
