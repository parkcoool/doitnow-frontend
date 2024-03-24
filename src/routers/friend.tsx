import type { RouteObject } from "react-router";

import Friend from "pages/main/friend";
import Request from "pages/main/friend/request";

const friendRouter: RouteObject = {
  path: "/friend",
  children: [
    { index: true, element: <Friend /> },
    { path: "request", element: <Request /> },
  ],
};

export default friendRouter;
