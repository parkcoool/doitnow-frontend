/** @jsxImportSource @emotion/react */

import React from "react";

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import Narrow from "components/layout/Narrow";
import useSessionStore from "contexts/useSessionStore";

import getUserById from "apis/getUserById";
import Profile from "./components/Profile";
import Menu from "./components/Menu";
import LogoutDialog from "./components/LogoutDialog";

import type { ProfilePreview } from "user";

export default function My() {
  const session = useSessionStore();
  const navigate = useNavigate();

  const [myProfilePreview, setMyProfilePreview] = React.useState<ProfilePreview>();

  React.useEffect(() => {
    const userId = session.user?.id;
    if (userId === undefined) return;

    getUserById({ id: userId }).then((res) => {
      if (res.result.user)
        setMyProfilePreview({
          profileImage: res.result.user.profileImage,
          name: res.result.user.name,
          bio: res.result.user.bio,
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

  return (
    <>
      <Narrow>
        {/* ===== 프로필 ===== */}
        <div css={{ marginTop: "32px" }}>
          <Profile
            myProfilePreview={myProfilePreview}
            onMyProfileViewClick={() => session.user && navigate(`/profile/${session.user.id}`)}
          />
        </div>

        {/* ===== 메뉴 ===== */}
        <div css={{ marginTop: "32px" }}>
          <Menu onLogout={handleLogoutDialogOpen} />
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
