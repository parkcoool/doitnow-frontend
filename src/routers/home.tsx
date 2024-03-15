import type { RouteObject } from "react-router";

import Home from "pages/main/home";

const homeRouter: RouteObject = {
  path: "/",
  element: <Home />,
  children: [],
};

export default homeRouter;
