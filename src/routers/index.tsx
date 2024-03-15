import { createBrowserRouter } from "react-router-dom";

import App from "pages";

import authRouter from "./auth";
import homeRouter from "./home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [authRouter, homeRouter],
  },
]);

export default router;
