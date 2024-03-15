import { createBrowserRouter } from "react-router-dom";

import App from "pages";

import authRouter from "./auth";
import homeRouter from "./home";
import exploreRouter from "./explore";
import friendRouter from "./friend";
import myRouter from "./my";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [authRouter, homeRouter, exploreRouter, friendRouter, myRouter],
  },
]);

export default router;
