/** @jsxImportSource @emotion/react */
import React from "react";

import { Divider, Paper } from "@mui/material";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";

import useSessionStore from "contexts/useSessionStore";

import FriendButton from "./FriendButton";
import ActionButton from "./ActionButton";
import ActionTypography from "./ActionTypography";

import type { PublicProfile } from "user";

interface ActionsProps {
  profile: PublicProfile | undefined;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Actions({ profile, loading, setLoading }: ActionsProps) {
  const session = useSessionStore();

  return profile !== undefined && session.user?.id !== profile.id ? (
    <>
      <Paper
        css={{
          height: "72px",
          width: "100%",
          marginTop: "24px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <FriendButton profile={profile} loading={loading} setLoading={setLoading} />

        <Divider orientation="vertical" variant="middle" flexItem />

        <ActionButton disabled={loading}>
          <BlockRoundedIcon />
          <ActionTypography>차단</ActionTypography>
        </ActionButton>
      </Paper>
    </>
  ) : null;
}
