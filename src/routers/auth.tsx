import type { RouteObject } from "react-router";

import Login from "pages/auth";

const authRouter: RouteObject = {
  path: "login",
  element: <Login />,
  children: [],
};

export default authRouter;
