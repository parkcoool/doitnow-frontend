/** @jsxImportSource @emotion/react */

import React from "react";

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import getPublicProfile from "apis/getPublicProfile";
import Narrow from "components/layout/Narrow";
import ProfilePreview from "components/common/ProfilePreview";
import useSessionStore from "contexts/useSessionStore";

import Menu from "./components/Menu";
import LogoutDialog from "./components/LogoutDialog";

import type { SmallProfile } from "user";

export default function My() {
  const session = useSessionStore();
  const navigate = useNavigate();

  const [myProfilePreview, setMyProfilePreview] = React.useState<SmallProfile>();

  React.useEffect(() => {
    const userId = session.user?.id;
    if (userId === undefined) return;

    const accessToken = session.accessToken?.token;
    if (accessToken === undefined) return;

    getPublicProfile({ id: userId }, accessToken).then((res) => {
      if (res.status !== 200) return;

      setMyProfilePreview({
        profileImage: res.data.profileImage,
        username: res.data.username,
        name: res.data.name,
        bio: res.data.bio,
        id: res.data.id,
      });
    });
  }, []);

  // 로그아웃 다이얼로그를 관리한다.
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = React.useState(false);

  function handleLogoutDialogConfirm() {
    session.setAccessToken(null);
    session.setUser(null);
    Cookies.remove("refreshToken");
    handleLogoutDialogClose();
    navigate("/auth/login");
  }

  function handleLogoutDialogOpen() {
    setIsLogoutDialogOpen(true);
  }

  function handleLogoutDialogClose() {
    setIsLogoutDialogOpen(false);
  }

  function handleProfileEdit() {
    navigate("/my/edit");
  }

  return (
    <>
      <Narrow>
        {/* ===== 프로필 ===== */}
        <div css={{ marginTop: "32px" }}>
          <ProfilePreview
            profilePreview={myProfilePreview}
            onClick={() => session.user && navigate(`/profile/${session.user.id}`)}
          />
        </div>

        {/* ===== 메뉴 ===== */}
        <div css={{ marginTop: "32px" }}>
          <Menu onLogout={handleLogoutDialogOpen} onProfileEdit={handleProfileEdit} />
        </div>
      </Narrow>

      {/* 로그아웃 다이얼로그 */}
      <LogoutDialog
        dialogOpen={isLogoutDialogOpen}
        handleDialogClose={handleLogoutDialogClose}
        handleConfirm={handleLogoutDialogConfirm}
      />
    </>
  );
}
