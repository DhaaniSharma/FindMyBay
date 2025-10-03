import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import UserLogin from "./pages/UserLogin.jsx"; // 👈 Import UserLogin page
import Register from "./pages/Register.jsx";
import OwnerRegister from "./pages/OwnerRegister.jsx";
import OwnerDashboard from "./pages/OwnerDashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login" element={<UserLogin />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/owner-register" element={<OwnerRegister />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;