import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Layout from "components/layout/Layout";
import { Tab } from "components/layout/Footer";
import useSessionStore from "contexts/useSessionStore";

export default function Main() {
  const location = useLocation();
  const session = useSessionStore();
  const navigate = useNavigate();

  // 로그인되어 있지 않으면 로그인 페이지로 이동
  React.useEffect(() => {
    if (!session.user) {
      navigate("/auth/login");
    }
  }, [session]);

  function getTab(): Tab {
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
        return Tab.Home;
    }
  }

  return (
    <Layout headerDisabled tab={getTab()}>
      <Outlet />
    </Layout>
  );
}
