/** @jsxImportSource @emotion/react */

import React from "react";
import { InputAdornment, TextField } from "@mui/material";

import ProfilePreview from "components/common/ProfilePreview";
import DeferredSkeleton from "components/common/DeferredSkeleton";

import type { SmallProfile } from "user";
import type { PublicData } from "..";

interface PublicProps {
  publicData: PublicData | undefined;
  publicDataDispatch: React.Dispatch<Partial<PublicData | undefined>>;
  loading: boolean;
}

function getProfilePreview(profile: PublicData): SmallProfile | undefined {
  return (
    profile && {
      profileImage: profile?.profileImage ?? null,
      username: profile?.username,
      name: profile?.name ?? "이름 없음",
      bio: profile?.bio?.trim() || null,
      id: -1,
    }
  );
}

export default function Public({ publicData, publicDataDispatch, loading }: PublicProps) {
  const profilePreview = publicData && getProfilePreview(publicData);

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

      {publicData ? (
        <TextField
          label="사용자 이름"
          autoComplete="username"
          value={publicData.username ?? ""}
          onChange={(e) => publicDataDispatch({ username: e.target.value.trim() })}
          disabled={loading}
          fullWidth
          required
        />
      ) : (
        <DeferredSkeleton>
          <TextField fullWidth required />
        </DeferredSkeleton>
      )}

      {publicData ? (
        <TextField
          label="이름"
          autoComplete="name"
          value={publicData.name ?? ""}
          onChange={(e) => publicDataDispatch({ name: e.target.value.trim() })}
          disabled={loading}
          InputProps={{
            startAdornment: <InputAdornment position="start">@</InputAdornment>,
          }}
          fullWidth
          required
        />
      ) : (
        <DeferredSkeleton>
          <TextField fullWidth required />
        </DeferredSkeleton>
      )}

      {publicData ? (
        <TextField
          label="소개"
          autoComplete="off"
          value={publicData.bio ?? ""}
          onChange={(e) => publicDataDispatch({ bio: e.target.value })}
          disabled={loading}
          fullWidth
          multiline
          rows={3}
        />
      ) : (
        <DeferredSkeleton>
          <TextField fullWidth multiline minRows={3} />
        </DeferredSkeleton>
      )}
    </div>
  );
}
