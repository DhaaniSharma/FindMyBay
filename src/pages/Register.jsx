import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    emailOtp: "",
    phone: "",
    address: "",
    carNumber: "",
    carCompany: "",
    carModel: "",
  });

  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Send Email OTP
  const sendEmailOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5001/api/otp/send", {
        contact: formData.email,
        type: "email",
      });
      if (res.data.success) {
        setEmailOtpSent(true);
        alert("Email OTP sent successfully!");
      } else {
        // service not configured or failure message from backend
        setEmailOtpSent(true);
        alert(res.data.message || "OTP queued — check backend logs.");
      }
    } catch (err) {
      alert(err.response?.data?.error || err.response?.data?.message || err.message);
    }
  };

  // Verify Email OTP
  const verifyEmailOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5001/api/otp/verify", {
        contact: formData.email,
        otp: formData.emailOtp,
        type: "email",
      });
      setEmailVerified(true);
      alert(res.data.message || "Email verified");
    } catch (err) {
      alert(err.response?.data?.error || "Invalid Email OTP");
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailVerified) {
      alert("Please verify your Email OTP before registering!");
      return;
    }

    try {
      await axios.post("http://localhost:5001/api/users/register", formData);
      alert("User registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      {/* Greyish Box */}
      <div className="bg-gray-100 shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
          User Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700"
            required
          />

          {/* Email + OTP */}
          <div>
            <div className="flex gap-2">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700"
                required
              />
              <button
                type="button"
                onClick={sendEmailOtp}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
              >
                Send OTP
              </button>
            </div>
            {emailOtpSent && !emailVerified && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  name="emailOtp"
                  placeholder="Enter Email OTP"
                  value={formData.emailOtp}
                  onChange={handleChange}
                  className="flex-1 p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700"
                  required
                />
                <button
                  type="button"
                  onClick={verifyEmailOtp}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
                >
                  Verify
                </button>
              </div>
            )}
            {emailVerified && (
              <p className="text-green-700 mt-1 font-semibold">Email Verified ✅</p>
            )}
          </div>

          {/* Phone (no OTP) */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700"
            required
          />

          {/* Address */}
          <textarea
            name="address"
            placeholder="Home Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700"
            rows="3"
            required
          />

          {/* Car Number */}
          <input
            type="text"
            name="carNumber"
            placeholder="Car Number (e.g., MH12AB1234)"
            value={formData.carNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700"
            required
          />

          {/* Car Details */}
          <div className="flex gap-2">
            <input
              type="text"
              name="carCompany"
              placeholder="Car Company"
              value={formData.carCompany}
              onChange={handleChange}
              className="w-1/2 p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700"
              required
            />
            <input
              type="text"
              name="carModel"
              placeholder="Car Model"
              value={formData.carModel}
              onChange={handleChange}
              className="w-1/2 p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-900 font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;