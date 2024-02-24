import type { RouteObject } from "react-router";

import Login from "pages/auth/login";
import Auth from "pages/auth";

const authRouter: RouteObject = {
  path: "auth",
  element: <Auth />,
  children: [
    {
      path: "login",
      element: <Login />,
    },
  ],
};

export default authRouter;
