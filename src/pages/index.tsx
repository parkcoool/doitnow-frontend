import { Outlet } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import usePreferenceStore, { Theme } from "contexts/usePreferenceStore";

import lightTheme from "styles/lightTheme";
import darkTheme from "styles/darkTheme";

export default function App() {
  const preference = usePreferenceStore();

  const theme = preference.theme === Theme.Dark ? darkTheme : lightTheme;

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </>
  );
}
