import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppProvider, useAppContext } from "./context/AppContext.jsx";
import lightTheme from "./themes/LightTheme.jsx";
import darkTheme from "./themes/DarkTheme.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

const ThemeWrapper = () => {
  const { darkMode } = useAppContext();

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <ThemeWrapper />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
