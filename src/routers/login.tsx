import type { RouteObject } from "react-router";

import Login from "pages/login";

const loginRoute: RouteObject = {
  path: "login",
  element: <Login />,
  children: [],
};

export default loginRoute;
