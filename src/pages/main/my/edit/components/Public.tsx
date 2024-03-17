/** @jsxImportSource @emotion/react */

import React from "react";
import { Box, InputAdornment, Skeleton, TextField } from "@mui/material";

import ProfilePreview from "components/common/ProfilePreview";

import type { FullProfile, SmallProfile } from "user";

interface ProfileProps {
  profile: FullProfile | undefined;
  profileDispatch: React.Dispatch<Partial<FullProfile | undefined>>;
  loading: boolean;
}

export default function Public({ profile, profileDispatch, loading }: ProfileProps) {
  function getProfilePreview(profile: FullProfile): SmallProfile | undefined {
    return (
      profile && {
        profileImage: profile?.profileImage ?? null,
        username: profile?.username,
        name: profile?.name ?? "이름 없음",
        bio: profile?.bio || null,
      }
    );
  }

  const profilePreview = profile && getProfilePreview(profile);

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <div
        css={{
          marginBottom: "24px",
        }}
      >
        <ProfilePreview profilePreview={profilePreview} />
      </div>

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
    </div>
  );
}
