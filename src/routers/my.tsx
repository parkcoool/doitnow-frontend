import type { RouteObject } from "react-router";

import My from "pages/main/my";

const myRouter: RouteObject = {
  path: "/my",
  element: <My />,
  children: [],
};

export default myRouter;
