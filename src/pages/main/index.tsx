/** @jsxImportSource @emotion/react */

import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import CircularProgress from "@mui/material/CircularProgress";
import Layout from "components/layout/Layout";
import { Tab } from "components/layout/Footer";

import useSessionStore from "contexts/useSessionStore";
import refershToken from "apis/refreshToken";

export default function Main() {
  const location = useLocation();
  const session = useSessionStore();
  const navigate = useNavigate();

  // 로그인되어 있지 않으면 로그인 페이지로 이동
  React.useEffect(() => {
    if (!session.user) {
      const refreshToken = Cookies.get("refreshToken");

      if (refreshToken !== undefined) {
        refershToken({ refreshToken }).then((res) => {
          const accessToken = res.result.token?.accessToken;
          const newRefreshToken = res.result.token?.refreshToken;

          if (
            res.code !== 1000 ||
            accessToken === undefined ||
            newRefreshToken === undefined ||
            res.result.id === undefined ||
            res.result.name === undefined
          ) {
            navigate("/auth/login");
          } else {
            session.setAccessToken(accessToken);
            session.setUser({
              id: res.result.id,
              name: res.result.name,
            });

            Cookies.set("refreshToken", newRefreshToken.token, {
              expires: newRefreshToken.expiresIn,
              secure: process.env.NODE_ENV === "production",
            });
          }
        });
      } else {
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
