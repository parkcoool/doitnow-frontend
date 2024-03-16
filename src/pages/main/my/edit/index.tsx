/** @jsxImportSource @emotion/react */

import React from "react";

import getUserById from "apis/getUserById";
import Layout from "components/layout/Layout";
import useSessionStore from "contexts/useSessionStore";

import getReducer from "utils/common/getReducer";
import Narrow from "components/layout/Narrow";
import EditView from "./components/Edit";

import type { FullProfile } from "user";

export default function Edit() {
  const session = useSessionStore();

  const profileReducer = getReducer<FullProfile | undefined>();
  const [profile, profileDispatch] = React.useReducer(profileReducer, undefined);

  React.useEffect(() => {
    const userId = session.user?.id;
    if (userId === undefined) return;

    // TODO: 이메일
    getUserById({ id: userId }).then((res) => {
      if (res.result.user)
        profileDispatch({ ...res.result.user, createdAt: new Date(res.result.user.createdAt), email: "" });
    });
  }, [session.user?.id]);

  return (
    <Layout headerContent="계정 정보 수정" footerDisabled>
      <Narrow>
        <EditView profile={profile} profileDispatch={profileDispatch} />
      </Narrow>
    </Layout>
  );
}
