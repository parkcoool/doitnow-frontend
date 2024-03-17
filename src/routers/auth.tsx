import type { RouteObject } from "react-router";

import Login from "pages/auth/login";
import Signup from "pages/auth/signup";
import Recovery from "pages/auth/recovery";
import PasswordRecovery from "pages/auth/recovery/password";
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
    {
      path: "recovery",
      children: [
        { index: true, element: <Recovery /> },
        { path: "password", element: <PasswordRecovery /> },
      ],
    },
  ],
};

export default authRouter;
