import type { RouteObject } from "react-router";

import Login from "pages/auth/login";
import Signup from "pages/auth/signup";
import Auth from "pages/auth";

const authRouter: RouteObject = {
  path: "auth",
  element: <Auth />,
  children: [
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
  ],
};

export default authRouter;
