import { createBrowserRouter } from "react-router-dom";

import App from "pages";

import authRouter from "./auth";
import mainRouter from "./main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [authRouter, mainRouter],
  },
]);

export default router;
