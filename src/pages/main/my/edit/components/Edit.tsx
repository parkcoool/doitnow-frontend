/** @jsxImportSource @emotion/react */

import React from "react";

import { CircularProgress, Slide } from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import ProfilePreview from "components/common/ProfilePreview";

import BottomButton from "components/common/BottomButton";
import Public from "./Public";
import Private from "./Private";

import type { FullProfile, SmallProfile } from "user";

interface ProfileProps {
  profile: FullProfile | undefined;
  profileDispatch: React.Dispatch<Partial<FullProfile | undefined>>;
}

export default function Edit({ profile, profileDispatch }: ProfileProps) {
  const [profileChanged, setProfileChanged] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  function getProfilePreview(): SmallProfile | undefined {
    return (
      profile && {
        profileImage: profile?.profileImage ?? null,
        username: profile?.username,
        name: profile?.name ?? "이름 없음",
        bio: profile?.bio || null,
      }
    );
  }

  function handleSubmit() {
    return;
  }

  // 값이 수정되면 profileChanged를 true로 설정한다.
  function profileDispatchWithChange(payload: Partial<FullProfile | undefined>) {
    profileDispatch(payload);
    setProfileChanged(true);
  }

  return (
    <>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: "80px",
        }}
      >
        {/* 프로필 미리보기 */}
        <div
          css={{
            marginTop: "24px",
          }}
        >
          <ProfilePreview profilePreview={getProfilePreview()} />
        </div>

        {/* TODO: tab으로 공개 정보 및 개인 정보 수정 페이지를 나누기 */}

        {/* 공개 정보 */}
        <Public profile={profile} profileDispatch={profileDispatchWithChange} loading={loading} />

        {/* 개인 정보 */}
        <Private profile={profile} profileDispatch={profileDispatchWithChange} loading={loading} />
      </div>

      {/* 저장 버튼 */}
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
