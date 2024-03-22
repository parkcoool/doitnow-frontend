import type { RouteObject } from "react-router";

import Notification from "pages/main/notification";

const notificationRouter: RouteObject = {
  path: "/notification",
  element: <Notification />,
  children: [],
};

export default notificationRouter;
