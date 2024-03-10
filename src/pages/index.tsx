import { Outlet } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import theme from "styles/theme";

export default function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </>
  );
}
