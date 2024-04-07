import React, { useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DeviceDetector from "device-detector-js";

const App = () => {
  useEffect(()=>{
    const deviceDetector = new DeviceDetector();
    console.log(deviceDetector.parse(window.navigator.userAgent))
  },[])
  return (
    <Routes>
      <Route
        path=""
        element={<Login />} />
      <Route
        path="/signup"
        element={<Signup />} />
      <Route
        path="/dashboard"
        element={<Dashboard />} />
    </Routes>
  )
}

export default App