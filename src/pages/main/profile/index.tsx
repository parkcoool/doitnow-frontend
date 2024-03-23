/** @jsxImportSource @emotion/react */

import React from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";

import getPublicProfile from "apis/getPublicProfile";
import Narrow from "components/layout/Narrow";
import Layout from "components/layout/Layout";
import useSessionStore from "contexts/useSessionStore";

import ProfileView from "./components/Profile";

import type { PublicProfile } from "user";

export default function Profile() {
  const session = useSessionStore();
  const { userId } = useParams();

  const [profile, setProfile] = React.useState<PublicProfile>();

  React.useEffect(() => {
    if (userId === undefined) return;

    const accessToken = session.accessToken?.token;
    if (accessToken === undefined) return;

    getPublicProfile({ id: parseInt(userId) }, accessToken).then((res) => {
      if (res.status !== 200) return;
      setProfile({ ...res.data, createdAt: new Date(res.data.createdAt) });
    });
  }, [userId]);

  return (
    <Layout headerContent={profile?.username ?? <Skeleton width={100} />} footerDisabled>
      <Narrow>
        <ProfileView profile={profile} />
      </Narrow>
    </Layout>
  );
}
