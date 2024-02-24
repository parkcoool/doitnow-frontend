import { Outlet } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import usePreferenceStore from "contexts/usePreferenceStore";

import theme from "styles/theme";

export default function App() {
  const preference = usePreferenceStore();

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </>
  );
}
