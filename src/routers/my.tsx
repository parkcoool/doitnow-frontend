import type { RouteObject } from "react-router";

import My from "pages/main/my";
import Edit from "pages/main/my/edit";

const myRouter: RouteObject = {
  path: "/my",
  children: [
    { index: true, element: <My /> },
    {
      path: "edit",
      element: <Edit />,
    },
  ],
};

export default myRouter;
