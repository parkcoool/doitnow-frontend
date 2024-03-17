/** @jsxImportSource @emotion/react */

import React from "react";

import getPrivateProfile from "apis/getPrivateProfile";
import Layout from "components/layout/Layout";
import Narrow from "components/layout/Narrow";
import useSessionStore from "contexts/useSessionStore";
import getReducer from "utils/common/getReducer";

import EditView from "./components/Edit";

import type { FullProfile } from "user";

export default function Edit() {
  const session = useSessionStore();

  const profileReducer = getReducer<FullProfile | undefined>();
  const [profile, profileDispatch] = React.useReducer(profileReducer, undefined);

  React.useEffect(() => {
    const { accessToken } = session;
    if (accessToken === null) return;

    // TODO: 이메일
    getPrivateProfile(accessToken.token).then((res) => {
      if (res.status !== 200) return;
      profileDispatch({ ...res.data, createdAt: new Date(res.data.createdAt) });
    });
  }, []);

  return (
    <Layout headerContent="계정 정보 수정" footerDisabled>
      <Narrow>
        <EditView profile={profile} profileDispatch={profileDispatch} />
      </Narrow>
    </Layout>
  );
}
