import React from "react";

import { Outlet, useNavigate } from "react-router-dom";

import useSessionStore from "contexts/useSessionStore";

export default function App() {
  const session = useSessionStore();
  const navigate = useNavigate();

  // 로그인되어 있지 않으면 로그인 페이지로 이동
  React.useEffect(() => {
    if (session.user === null) navigate("/login");
  }, [session]);

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}
