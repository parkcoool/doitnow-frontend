import { Outlet } from "react-router-dom";

import useSessionStore from "contexts/useSessionStore";

export default function Auth() {
  const session = useSessionStore();

  return (
    <>
      <h1>{session.user?.name}님</h1>
      <Outlet />
    </>
  );
}
