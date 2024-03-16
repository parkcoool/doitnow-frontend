/** @jsxImportSource @emotion/react */

import React from "react";
import { useParams } from "react-router-dom";

import { Skeleton } from "@mui/material";
import getUserById from "apis/getUserById";
import Narrow from "components/layout/Narrow";
import Layout from "components/layout/Layout";

import ProfileView from "./components/Profile";

import type { PublicProfile } from "user";

export default function Profile() {
  const { userId } = useParams();

  const [profile, setProfile] = React.useState<PublicProfile>();

  React.useEffect(() => {
    if (userId === undefined) return;

    getUserById({ id: parseInt(userId) }).then((res) => {
      if (res.result.user) setProfile({ ...res.result.user, createdAt: new Date(res.result.user.createdAt) });
    });
  }, [userId]);

  return (
    <Layout headerContent={profile?.name ?? <Skeleton width={100} />} footerDisabled>
      <Narrow>
        <ProfileView profile={profile} />
      </Narrow>
    </Layout>
  );
}
