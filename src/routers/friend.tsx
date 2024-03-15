import type { RouteObject } from "react-router";

import Friend from "pages/friend";

const friendRouter: RouteObject = {
  path: "/friend",
  element: <Friend />,
  children: [],
};

export default friendRouter;
