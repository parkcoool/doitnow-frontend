import { createBrowserRouter } from "react-router-dom";

import App from "pages";

import authRouter from "./auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [authRouter],
  },
]);

export default router;
