import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2196F3",
      light: "#64B5F6",
      dark: "#1976D2",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FF4081",
      light: "#FF80AB",
      dark: "#F50057",
      contrastText: "#fff",
    },
    error: {
      main: "#FF5252",
      light: "#FF8A80",
      dark: "#FF1744",
      contrastText: "#fff",
    },
    warning: {
      main: "#FFD740",
      light: "#FFFF8D",
      dark: "#FFC400",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    info: {
      main: "#2196F3",
      light: "#64B5F6",
      dark: "#1976D2",
      contrastText: "#fff",
    },
    success: {
      main: "#4CAF50",
      light: "#81C784",
      dark: "#388E3C",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
    background: {
      default: "#f5f5f5",
      paper: "#fff",
    },
    divider: "#BDBDBD",
  },
});

export default theme;
