import { RouterProvider } from "react-router-dom";
import axios from "axios";
import ReactDOM from "react-dom/client";

import router from "routers";

import "./index.css";

axios.defaults.validateStatus = (status) => status >= 200 && status <= 500;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<RouterProvider router={router} />);
