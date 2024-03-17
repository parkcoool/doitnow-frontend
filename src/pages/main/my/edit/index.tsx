/** @jsxImportSource @emotion/react */

import React from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CircularProgress from "@mui/material/CircularProgress";
import Slide from "@mui/material/Slide";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import getPrivateProfile from "apis/getPrivateProfile";
import BottomButton from "components/common/BottomButton";
import Layout from "components/layout/Layout";
import Narrow from "components/layout/Narrow";
import useSessionStore from "contexts/useSessionStore";
import getReducer from "utils/common/getReducer";

import Public from "./components/Public";
import Private from "./components/Private";

import type { FullProfile } from "user";

enum EditTab {
  Public = 0,
  Private = 1,
}

export default function Edit() {
  const session = useSessionStore();

  // profile를 관리하는 reducer를 생성한다.
  const profileReducer = getReducer<FullProfile | undefined>();
  const [profile, profileDispatch] = React.useReducer(profileReducer, undefined);

  const [tab, setTab] = React.useState<EditTab>(EditTab.Public);
  const [profileChanged, setProfileChanged] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // 로그인한 사용자의 프로필 정보를 가져온다.
  React.useEffect(() => {
    const { accessToken } = session;
    if (accessToken === null) return;

    getPrivateProfile(accessToken.token).then((res) => {
      if (res.status !== 200) return;
      profileDispatch({ ...res.data, createdAt: new Date(res.data.createdAt) });
    });
  }, []);

  // 값이 수정되면 profileChanged를 true로 설정한다.
  function profileDispatchWithChange(payload: Partial<FullProfile | undefined>) {
    profileDispatch(payload);
    setProfileChanged(true);
  }

  function handleTabChange(event: React.SyntheticEvent, newValue: EditTab) {
    setTab(newValue);
  }

  function handleSubmit() {
    return;
  }

  return (
    <>
      <Layout headerContent="계정 정보 수정" footerDisabled>
        <div
          css={{
            position: "sticky",
            top: "55px",
            backgroundColor: "white",
            zIndex: 100,
          }}
        >
          <Tabs value={tab} onChange={handleTabChange} variant="fullWidth">
            <Tab label="공개 정보" />
            <Tab label="개인 정보" />
          </Tabs>
        </div>

        <Narrow>
          <div
            css={{
              marginTop: "24px",
              paddingBottom: profileChanged ? "80px" : 0,
            }}
          >
            {tab === EditTab.Public && (
              <Public profile={profile} profileDispatch={profileDispatchWithChange} loading={loading} />
            )}
            {tab === EditTab.Private && (
              <Private profile={profile} profileDispatch={profileDispatchWithChange} loading={loading} />
            )}
          </div>
        </Narrow>
      </Layout>

      <Slide direction="up" in={profileChanged} mountOnEnter>
        <div
          css={{
            position: "fixed",
            left: 0,
            bottom: "64px",
            width: "100%",
            zIndex: 100,
          }}
        >
          <BottomButton
            primaryText="저장"
            primaryButtonProps={{
              variant: "contained",
              onClick: handleSubmit,
              disabled: loading,
              endIcon: loading ? <CircularProgress size={16} color="inherit" /> : <SaveRoundedIcon color="inherit" />,
              disableElevation: true,
            }}
          />
        </div>
      </Slide>
    </>
  );
}
