/** @jsxImportSource @emotion/react */

import React from "react";
import { useParams } from "react-router-dom";

import Narrow from "components/layout/Narrow";
import getUserById from "apis/getUserById";
import ProfileView from "./components/Profile";

import type { Profile } from "user";

export default function Profile() {
  const { userId } = useParams();

  const [profile, setProfile] = React.useState<Profile>();

  React.useEffect(() => {
    if (userId === undefined) return;

    getUserById({ id: parseInt(userId) }).then((res) => {
      if (res.result.user) setProfile({ ...res.result.user, createdAt: new Date(res.result.user.createdAt) });
    });
  }, [userId]);

  return (
    <Narrow>
      <ProfileView profile={profile} />
    </Narrow>
  );
}
