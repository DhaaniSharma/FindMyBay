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
    password: "",
    address: "",
    carNumber: "",
    carCompany: "",
    carModel: "",
  });

  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Send Email OTP
  const sendEmailOtp = async () => {
    if (!formData.email) return alert("Enter email first");
    try {
      const res = await axios.post("http://localhost:5001/api/otp/send", {
        contact: formData.email,
        type: "email",
      });
      if (res.data.success) {
        setEmailOtpSent(true);
        alert("OTP sent to email");
      } else {
        alert(res.data.message || "OTP saved — check backend logs");
      }
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  // Verify Email OTP
  const verifyEmailOtp = async () => {
    if (!formData.emailOtp) return alert("Enter OTP");
    try {
      const res = await axios.post("http://localhost:5001/api/otp/verify", {
        contact: formData.email,
        otp: formData.emailOtp,
        type: "email",
      });
      setEmailVerified(true);
      alert(res.data.message || "Email verified successfully");
    } catch (err) {
      alert(err.response?.data?.error || "Invalid Email OTP");
    }
  };

  // Handle Registration Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailVerified) return alert("Verify your Email OTP first");

    // Check for missing required fields
    const requiredFields = ["name", "email", "phone", "password"];
    for (let field of requiredFields) {
      if (!formData[field]) return alert(`${field} is required`);
    }

    try {
      const res = await axios.post("http://localhost:5001/api/users/register", formData);
      if (res.data.success) {
        alert("User registered successfully!");
        navigate("/login");
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      <div className="bg-gray-100 shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">User Registration</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full p-3 border rounded-lg" />

          <div>
            <div className="flex gap-2">
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="flex-1 p-3 border rounded-lg" />
              <button type="button" onClick={sendEmailOtp} className="px-4 py-2 bg-blue-900 text-white rounded-lg">Send OTP</button>
            </div>
            {emailOtpSent && !emailVerified && (
              <div className="flex gap-2 mt-2">
                <input type="text" name="emailOtp" placeholder="Enter Email OTP" value={formData.emailOtp} onChange={handleChange} className="flex-1 p-3 border rounded-lg" />
                <button type="button" onClick={verifyEmailOtp} className="px-4 py-2 bg-green-600 text-white rounded-lg">Verify</button>
              </div>
            )}
            {emailVerified && <p className="text-green-700 mt-1 font-semibold">Email Verified ✅</p>}
          </div>

          <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
          <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-3 border rounded-lg" rows="2" />
          <input type="text" name="carNumber" placeholder="Car Number" value={formData.carNumber} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <input type="text" name="carCompany" placeholder="Car Company" value={formData.carCompany} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <input type="text" name="carModel" placeholder="Car Model" value={formData.carModel} onChange={handleChange} className="w-full p-3 border rounded-lg" />

          <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-lg">Register</button>
        </form>

        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-900 font-semibold">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;