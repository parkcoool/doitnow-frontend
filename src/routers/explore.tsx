import type { RouteObject } from "react-router";

import Explore from "pages/explore";

const exploreRouter: RouteObject = {
  path: "/explore",
  element: <Explore />,
  children: [],
};

export default exploreRouter;
