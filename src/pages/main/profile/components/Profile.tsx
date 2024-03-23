/** @jsxImportSource @emotion/react */
import Basic from "./Basic";
import Detail from "./Detail";

import type { PublicProfile } from "user";

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
      <Basic profile={profile} />

      {/* 세부 정보 */}
      <Detail profile={profile} />
    </div>
  );
}
