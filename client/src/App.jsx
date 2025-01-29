import React, { useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import { useDispatch, useSelector } from "react-redux";
import { authControl } from "./helper/auth";
import { refreshFetch, reset } from "./redux/slices/refreshSlice";
import { login } from "./redux/slices/authSlice";
import { createTheme, SpeedDial, SpeedDialAction, SpeedDialIcon, ThemeProvider } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#673ab7",
      light: "#8561c5",
      dark: "#482880",
      // main: "#f44336",
      // light: "#ef9a9a",
      // dark: "#b71c1c",
    },
    secondary: {
      light: '#8b74b1',
      main: '#6e529e',
      dark: '#4d396e',
    },
    analogous: {
      main: "#07d9c1",
      second: "#0720d9",
    },
    triadic: {
      main: "#5807d9",
      second: "#d90788",
    },
    complementary: {
      main: "#d95707",
      light: "#24b7fe",
      dark: "#f39914",
    },
    danger: {
      main: "#df0000",
      second: "#f60000",
      light: "#ff5a3a",
    },
    success: {
      main: "#009100",
      second: "#22f200",
      light: "#62f600",
      dark: "#00e000",
    },
    primaryBootstrap: {
      main: "#3b71ca",
      second: "#4184dd",
      light: "#4592eb",
      dark: "#2d4398",
    }
  },
  typography: {
    fontFamily: '"Arial", sans-serif',
    h4: {
      fontWeight: "bold",
    },
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "fefefe", // Burada istediğiniz arka plan rengini belirtin
          "&:hover": {
            backgroundColor: "#e9e9e9", // Üzerine gelindiğinde arka plan rengini ayarlayın
          },
        },
      },
    },
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#673ab7",
      light: "#8561c5",
      dark: "#482880",
      // main: "#f44336",
      // light: "#ef9a9a",
      // dark: "#b71c1c",
    },
    secondary: {
      light: '#8b74b1',
      main: '#6e529e',
      dark: '#4d396e',
    },
    analogous: {
      main: "#07d9c1",
      second: "#0720d9",
    },
    triadic: {
      main: "#5807d9",
      second: "#d90788",
    },
    complementary: {
      main: "#d95707",
      light: "#24b7fe",
      dark: "#f39914",
    },
    danger: {
      main: "#df0000",
      second: "#f60000",
      light: "#ff5a3a",
    },
    success: {
      main: "#009100",
      second: "#22f200",
      light: "#62f600",
      dark: "#00e000",
    },
    primaryBootstrap: {
      main: "#3b71ca",
      second: "#4184dd",
      light: "#4592eb",
      dark: "#2d4398",
    },
    background: {
      default: "#121212", // Dark theme background color
      paper: "#1E1E1E", // Surface colors for cards or modal backgrounds
    },
    text: {
      primary: "#ffffff", // Text color for dark mode
      secondary: "#B0B0B0", // Slightly dimmed text for secondary elements
    },
  },
  typography: {
    fontFamily: '"Arial", sans-serif',
    h4: {
      fontWeight: "bold",
    },
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#424242", // Dark theme background for inputs
          "&:hover": {
            backgroundColor: "#616161", // Background color on hover for inputs
          },
        },
      },
    },
  },
});


const notAllowedPaths = ["/dashboard", "/profile"];
const App = () => {
  const state = useSelector((state) => state.auth);
  const refreshState = useSelector((state) => state.refresh);
  const themeState = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // refreshState control
    if (refreshState.data && refreshState.data !== undefined) {
      dispatch(login(refreshState.data));
      dispatch(reset());
      if (!notAllowedPaths.includes(location.pathname)) {
        navigate("/dashboard");
      }
      return;
    }

    // Token actions
    if (state.accessToken === "") {
      if (authControl()) {
        dispatch(refreshFetch());
        return;
      }

      if (notAllowedPaths.includes(location.pathname)) {
        navigate("/");
      }
    }

    if (location.pathname === "/") {
      if (state.accessToken !== "") navigate("/dashboard");
      else navigate("/login");
    }
    if (state.exp * 1000 - new Date().getTime() < 5 * 1000 * 60) {
      if (authControl()) {
        dispatch(refreshFetch());
        return;
      }
    }
  }, [location, navigate, state, refreshState, dispatch]);
  useEffect(() => {
    document.body.setAttribute("data-theme", themeState.isLight ? "light" : "dark");
  }, [themeState]);
  return (
    <ThemeProvider theme={themeState.isLight ? lightTheme : darkTheme }>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
