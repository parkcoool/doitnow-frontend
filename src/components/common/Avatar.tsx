/** @jsxImportSource @emotion/react */

import { Avatar as RawAvatar, Skeleton } from "@mui/material";
import stringToColor from "utils/common/stringToColor";

import type { AvatarProps } from "@mui/material";

interface ProfileProps extends AvatarProps {
  profileImage?: string | null;
  name?: string;
  username?: string;
}

export default function Avatar({ profileImage, name, username, ...props }: ProfileProps) {
  return profileImage !== undefined && username !== undefined ? (
    <RawAvatar src={profileImage ?? undefined} css={{ backgroundColor: stringToColor(name ?? "") }} {...props}>
      {!profileImage && username.length >= 1 && username[0].toUpperCase()}
    </RawAvatar>
  ) : (
    <Skeleton variant="circular" animation="wave">
      <RawAvatar {...props} />
    </Skeleton>
  );
}
