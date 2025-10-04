import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5001/api/users/login", loginData);

      if (res.data.success) {
        // Save JWT token and user data in localStorage
        localStorage.setItem("userToken", res.data.token);
        localStorage.setItem("userDetails", JSON.stringify(res.data.user));

        alert("Login successful!");
        navigate("/user-dashboard");
      } else {
        alert(res.data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      <div className="bg-gray-100 shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
          User Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700"
            required
          />
          <button
            type="submit"
            className={`w-full py-3 text-white font-semibold rounded-lg ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-900 hover:bg-blue-800"}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-900 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

        <div className="text-center mt-4">
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-gray-300 text-blue-900 font-semibold rounded-lg hover:bg-gray-400 transition-colors duration-300"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;