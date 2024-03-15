import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import useSessionStore from "contexts/useSessionStore";

export default function Login() {
  const session = useSessionStore();
  const navigate = useNavigate();

  // 로그인되어 있으면 홈 페이지로 이동
  React.useEffect(() => {
    if (session.user !== null)
      navigate("/", {
        replace: true,
      });
  }, [session]);

  return <Outlet />;
}
