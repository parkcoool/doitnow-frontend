import type { RouteObject } from "react-router";
import Main from "pages/main";

import exploreRouter from "./explore";
import friendRouter from "./friend";
import myRouter from "./my";
import homeRouter from "./home";
import profileRouter from "./profile";

const mainRouter: RouteObject = {
  path: "/",
  element: <Main />,
  children: [exploreRouter, friendRouter, myRouter, homeRouter, profileRouter],
};

export default mainRouter;
