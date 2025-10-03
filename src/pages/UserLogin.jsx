import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handle login submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Login Data:", loginData);
    alert("Login successful (simulation)!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      {/* Greyish Login Box */}
      <div className="bg-gray-100 shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
          User Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username / Email / Phone"
            value={loginData.username}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700"
            required
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800"
          >
            Log In
          </button>
        </form>

        {/* Register Redirect */}
        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-900 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

        {/* Back to Home */}
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