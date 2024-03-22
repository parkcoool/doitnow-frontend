/** @jsxImportSource @emotion/react */

import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import CircularProgress from "@mui/material/CircularProgress";

import refershToken from "apis/refreshToken";
import getPrivateProfile from "apis/getPrivateProfile";
import Layout from "components/layout/Layout";
import { Tab } from "components/layout/Footer";
import useSessionStore from "contexts/useSessionStore";

export default function Main() {
  const location = useLocation();
  const session = useSessionStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!session.user) {
      const refreshToken = Cookies.get("refreshToken");

      // 리프레시 토큰이 존재하는 경우
      if (refreshToken !== undefined) {
        (async function () {
          // 새 토큰 요청
          const refreshTokenRes = await refershToken({ refreshToken });
          if (refreshTokenRes.status !== 200) return navigate("/auth/login");

          const newAccessToken = refreshTokenRes.data.accessToken;
          const newRefreshToken = refreshTokenRes.data.refreshToken;

          // 사용자 정보 요청
          const getPrivateProfileRes = await getPrivateProfile(newAccessToken.token);
          if (getPrivateProfileRes.status !== 200) return navigate("/auth/login");

          // 새 토큰 저장
          session.setAccessToken(newAccessToken);
          Cookies.set("refreshToken", newRefreshToken.token, {
            expires: newRefreshToken.expiresIn,
            secure: process.env.NODE_ENV === "production",
          });

          // 사용자 정보 저장
          const { ...user } = getPrivateProfileRes.data;
          session.setUser({ ...user, createdAt: new Date(user.createdAt) });
        })();
      }

      // 로그인되어 있지 않으면 로그인 페이지로 이동
      else {
        navigate("/auth/login");
      }
    }
  }, []);

  // 현재 경로에 따라 탭을 반환
  function getTab(): Tab | undefined {
    switch (location.pathname.split("/")[1]) {
      case "":
        return Tab.Home;
      case "explore":
        return Tab.Explore;
      case "friend":
        return Tab.Friend;
      case "my":
        return Tab.My;
      default:
        return undefined;
    }
  }

  return (
    <Layout headerDisabled tab={getTab()}>
      {session.user !== null ? (
        <Outlet />
      ) : (
        <div
          css={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            css={{
              marginTop: "32px",
            }}
          />
        </div>
      )}
    </Layout>
  );
}
