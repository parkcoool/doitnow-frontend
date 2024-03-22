/** @jsxImportSource @emotion/react */

import React from "react";

import { Tabs, Tab, CircularProgress, Slide, Snackbar, IconButton } from "@mui/material";
import { SaveRounded as SaveRoundedIcon, Close as CloseIcon } from "@mui/icons-material";

import getPrivateProfile from "apis/getPrivateProfile";
import updatePublicProfile from "apis/updatePublicProfile";

import BottomButton from "components/common/BottomButton";
import Layout from "components/layout/Layout";
import Narrow from "components/layout/Narrow";

import useSessionStore from "contexts/useSessionStore";

import getReducer from "utils/common/getReducer";

import Public from "./components/Public";
import Private from "./components/Private";
import EmailVerify from "./components/EmailVerify";

import type { FullProfile } from "user";

enum EditTab {
  Public = 0,
  Private = 1,
}

interface Token {
  token: string;
  expiresIn: number;
}

export interface PublicData {
  profileImage: FullProfile["profileImage"];
  username: FullProfile["username"];
  name: FullProfile["name"];
  bio: FullProfile["bio"];
}

export interface PrivateData {
  verifiedEmail?: {
    email: string;
    token: Token;
  };
  password?: string;
  email: FullProfile["email"];
}

function getPrivateDataChanged(privateData: PrivateData) {
  return privateData.verifiedEmail !== undefined || privateData.password !== undefined;
}

function getPublicDataChanged(publicData: PublicData | undefined, initialPublicData: PublicData | undefined) {
  if (publicData === undefined || initialPublicData === undefined) return false;

  return (
    publicData.profileImage !== initialPublicData.profileImage ||
    publicData.username !== initialPublicData.username ||
    publicData.name !== initialPublicData.name ||
    publicData.bio !== initialPublicData.bio
  );
}

export default function Edit() {
  const session = useSessionStore();

  // privateData를 관리하는 reducer를 생성한다.
  const privateDataReducer = getReducer<PrivateData | undefined>();
  const [privateData, privateDataDispatch] = React.useReducer(privateDataReducer, undefined);
  const [initialPrivateData, setInitialPrivateData] = React.useState<PrivateData>();

  // publicData를 관리하는 reducer를 생성한다.
  const publicDataReducer = getReducer<PublicData | undefined>();
  const [publicData, publicDataDispatch] = React.useReducer(publicDataReducer, undefined);
  const [initialPublicData, setInitialPublicData] = React.useState<PublicData>();

  const [emailToken, setEmailToken] = React.useState<Token>();
  const [message, setMessage] = React.useState("");
  const [tab, setTab] = React.useState<EditTab>(EditTab.Public);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // 프로필이 변경되었는지 여부를 감지한다.
  const privateDataChanged = privateData && initialPrivateData && getPrivateDataChanged(privateData);
  const publicDataChanged = privateData && initialPrivateData && getPublicDataChanged(publicData, initialPublicData);
  const profileChanged = publicDataChanged || privateDataChanged;

  // 로그인한 사용자의 프로필 정보를 가져온다.
  React.useEffect(() => {
    const { accessToken } = session;
    if (accessToken === null) return;

    getPrivateProfile(accessToken.token).then((res) => {
      if (res.status !== 200) return;
      const profile = { ...res.data, createdAt: new Date(res.data.createdAt) };

      // 프로필 정보를 초기화한다.
      const publicData = {
        profileImage: profile.profileImage,
        username: profile.username,
        name: profile.name,
        bio: profile.bio,
      };

      const privateData = {
        email: profile.email,
      };

      publicDataDispatch(publicData);
      setInitialPublicData(publicData);
      privateDataDispatch(privateData);
      setInitialPrivateData(privateData);
    });
  }, []);

  // 탭 변경 이벤트 핸들러
  function handleTabChange(event: React.SyntheticEvent, newValue: EditTab) {
    setTab(newValue);
  }

  // 스낵바 닫기 이벤트 핸들러
  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  // 저장 버튼 클릭 이벤트 핸들러
  async function handleSubmit() {
    if (!profileChanged) return;

    // privateData는 변경되지 않고 publicData만 변경되었을 때
    if (!privateDataChanged && publicDataChanged) {
      const accessToken = session.accessToken;
      if (accessToken === null || publicData === undefined) return;

      const newPublicDataDispatch: Partial<PublicData> = { bio: publicData.bio?.trim() || null };
      const newPublicData: PublicData = { ...publicData, ...newPublicDataDispatch };
      publicDataDispatch(newPublicDataDispatch);
      setLoading(true);

      const res = await updatePublicProfile(newPublicData, accessToken.token);
      if (res.status === 200) {
        setInitialPublicData(newPublicData);
        setEmailToken(undefined);
      }

      setLoading(false);
      setMessage(res.data.message);
      setSnackbarOpen(true);
    }
  }

  return (
    <>
      <Layout headerContent="계정 정보 수정" loading={loading} footerDisabled>
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
              <Public publicData={publicData} publicDataDispatch={publicDataDispatch} loading={loading} />
            )}
            {tab === EditTab.Private && emailToken !== undefined && (
              <Private
                initialPrivateData={initialPrivateData}
                privateData={privateData}
                privateDataDispatch={privateDataDispatch}
                loading={loading}
                setLoading={setLoading}
              />
            )}
            {tab === EditTab.Private && emailToken === undefined && (
              <EmailVerify
                email={initialPrivateData?.email}
                setEmailToken={setEmailToken}
                loading={loading}
                setLoading={setLoading}
              />
            )}
          </div>
        </Narrow>
      </Layout>

      {/* 프로필이 변경되었을 때만 저장 버튼을 보여준다. */}
      <Slide direction="up" in={profileChanged} mountOnEnter unmountOnExit>
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

      <Snackbar
        css={{
          bottom: "64px",
          marginBottom: "16px",
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={message}
        action={
          <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
}
