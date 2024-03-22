import type { RouteObject } from "react-router";
import Main from "pages/main";

import notificationRouter from "./notification";
import friendRouter from "./friend";
import myRouter from "./my";
import homeRouter from "./home";
import profileRouter from "./profile";

const mainRouter: RouteObject = {
  path: "/",
  element: <Main />,
  children: [notificationRouter, friendRouter, myRouter, homeRouter, profileRouter],
};

export default mainRouter;
