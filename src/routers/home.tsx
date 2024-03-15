import type { RouteObject } from "react-router";

import Home from "pages/home";

const homeRouter: RouteObject = {
  path: "/",
  element: <Home />,
  children: [],
};

export default homeRouter;
