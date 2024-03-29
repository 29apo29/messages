import React from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'

const App = () => {
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