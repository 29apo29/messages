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

const notAllowedPaths = ["/dashboard", "/profile"];
const App = () => {
  const state = useSelector((state) => state.auth);
  const refreshState = useSelector((state) => state.refresh);
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
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
