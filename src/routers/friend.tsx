import type { RouteObject } from "react-router";

import Friend from "pages/main/friend";

const friendRouter: RouteObject = {
  path: "/friend",
  children: [
    { index: true, element: <Friend /> },
  ],
};

export default friendRouter;
