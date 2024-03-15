import type { RouteObject } from "react-router";

import Profile from "pages/main/profile";

const profileRouter: RouteObject = {
  path: "/profile/:userId",
  element: <Profile />,
  children: [],
};

export default profileRouter;
