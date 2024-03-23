/** @jsxImportSource @emotion/react */
import React from "react";

import Actions from "./Actions";
import Basic from "./Basic";
import Detail from "./Detail";

import type { PublicProfile } from "user";

interface ProfileProps {
  profile: PublicProfile | undefined;
}

export default function Profile({ profile }: ProfileProps) {
  const [loading, setLoading] = React.useState(false);

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 기본 정보 */}
      <Basic profile={profile} />

      {/* 액션 */}
      <Actions profile={profile} loading={loading} setLoading={setLoading} />

      {/* 세부 정보 */}
      <Detail profile={profile} />
    </div>
  );
}
