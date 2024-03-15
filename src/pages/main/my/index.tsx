/** @jsxImportSource @emotion/react */

import React from "react";

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import Narrow from "components/layout/Narrow";
import useSessionStore from "contexts/useSessionStore";

import Profile from "./components/Profile";
import Menu from "./components/Menu";
import LogoutDialog from "./components/LogoutDialog";

export interface MyData {
  profileImage?: string;
  name: string;
  bio?: string;
}

export default function My() {
  const session = useSessionStore();
  const navigate = useNavigate();

  // TODO: 데이터 가져오기
  const [myData, setMyData] = React.useState<MyData>();

  React.useEffect(() => {
    setTimeout(() => {
      setMyData({
        profileImage: undefined,
        name: session.user?.name ?? "이름 없음",
        bio: "프론트엔드 개발자",
      });
    }, 2000);
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
          <Profile myData={myData} />
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
