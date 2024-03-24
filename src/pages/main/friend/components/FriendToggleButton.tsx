/** @jsxImportSource @emotion/react */
import { Typography, ToggleButton } from "@mui/material";

import Avatar from "components/common/Avatar";
import DeferredSkeleton from "components/common/DeferredSkeleton";

import type { ToggleButtonProps } from "@mui/material";
import type { SmallProfile } from "user";

interface FriendProps extends ToggleButtonProps {
  profile?: SmallProfile;
}

export default function FriendToggleButton({ profile, ...props }: FriendProps) {
  return (
    <ToggleButton
      {...props}
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        padding: "0 8px",
        boxSizing: "border-box",
        minWidth: "80px",
        maxWidth: "80px",
        height: "100px",
      }}
      disabled={profile === undefined}
    >
      {/* 프로필 사진 */}
      <div>
        <Avatar
          profileImage={profile?.profileImage}
          name={profile?.name}
          username={profile?.username}
          css={{
            width: "50px",
            height: "50px",
          }}
        />
      </div>

      {/* 사용자 이름 */}
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Typography
          css={{
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          component={"div"}
          fontWeight={600}
          fontSize="12px"
        >
          {profile ? profile.username : <DeferredSkeleton width="100%" />}
        </Typography>
      </div>
    </ToggleButton>
  );
}
