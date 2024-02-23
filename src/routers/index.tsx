import { createBrowserRouter } from "react-router-dom";

import App from "pages";

import loginRouter from "./login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [loginRouter],
  },
]);

export default router;
