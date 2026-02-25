import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#8b5cf6",
      },
      secondary: {
        main: "#06b6d4",
      },
      background: {
        default: mode === "dark" ? "#0f172a" : "#f4f6f8",
        paper: mode === "dark" ? "#1e293b" : "#ffffff",
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: "Inter, sans-serif",
    },
  });