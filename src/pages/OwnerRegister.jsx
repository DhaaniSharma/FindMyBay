import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Autocomplete } from "@react-google-maps/api";

const OwnerRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    emailOtp: "",
    phone: "",
    address: "",
    parking_address: "",
    parking_slots: "",
    slot_price: "",
    vehicle_type: "",
    password: "",
  });

  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [homeAutocomplete, setHomeAutocomplete] = useState(null);
  const [parkingAutocomplete, setParkingAutocomplete] = useState(null);

  const onHomeLoad = (autocompleteInstance) => setHomeAutocomplete(autocompleteInstance);
  const onParkingLoad = (autocompleteInstance) => setParkingAutocomplete(autocompleteInstance);

  const onHomePlaceChanged = () => {
    if (homeAutocomplete) {
      const place = homeAutocomplete.getPlace();
      const homeAddress = place.formatted_address || place.name;
      setFormData(prev => ({ ...prev, address: homeAddress }));
    }
  };

  const onParkingPlaceChanged = () => {
    if (parkingAutocomplete) {
      const place = parkingAutocomplete.getPlace();
      const parkingAddress = place.formatted_address || place.name;
      setFormData(prev => ({ ...prev, parking_address: parkingAddress }));
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // --- ALL LOGIC IS NOW CORRECT AND PRESENT ---

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
        setEmailOtpSent(true); // Still show the box even if sending fails on backend
        alert(res.data.message || "OTP could not be sent.");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Failed to send OTP.");
    }
  };

  const verifyEmailOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5001/api/otp/verify", {
        contact: formData.email,
        otp: formData.emailOtp,
        type: "email",
      });
      // A successful request (no error thrown) means OTP is correct.
      setEmailVerified(true);
      alert(res.data.message || "Email verified successfully!");
    } catch (err) {
      setEmailVerified(false);
      alert(err.response?.data?.error || "Invalid Email OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailVerified) {
      alert("Please verify your email before registering!");
      return;
    }
    try {
      // Use your original payload to send numbers correctly
      const payload = {
        ...formData,
        parking_slots: Number(formData.parking_slots),
        slot_price: Number(formData.slot_price),
      };
      const res = await axios.post("http://localhost:5001/api/owners/register", payload);
      if (res.data.success) {
        localStorage.setItem("ownerToken", res.data.token);
        localStorage.setItem("ownerDetails", JSON.stringify(res.data.owner));
        alert("Owner registered successfully!");
        navigate("/owner-dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      <div className="bg-gray-100 shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">Owner Registration</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Your form JSX is complete and correct */}
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700" required />
          <div>
            <div className="flex gap-2">
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="flex-1 p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700" required />
              <button type="button" onClick={sendEmailOtp} className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">Send OTP</button>
            </div>
            {emailOtpSent && !emailVerified && (
              <div className="flex gap-2 mt-2">
                <input type="text" name="emailOtp" placeholder="Enter Email OTP" value={formData.emailOtp} onChange={handleChange} className="flex-1 p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700" required />
                <button type="button" onClick={verifyEmailOtp} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500">Verify</button>
              </div>
            )}
            {emailVerified && (<p className="text-green-700 mt-1 font-semibold">Email Verified ✅</p>)}
          </div>
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700" required />
          <Autocomplete onLoad={onHomeLoad} onPlaceChanged={onHomePlaceChanged}>
            <input type="text" name="address" placeholder="Home Address" value={formData.address} onChange={handleChange} className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700" required />
          </Autocomplete>
          <Autocomplete onLoad={onParkingLoad} onPlaceChanged={onParkingPlaceChanged}>
            <input type="text" name="parking_address" placeholder="Parking Address" value={formData.parking_address} onChange={handleChange} className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700" required />
          </Autocomplete>
          <input type="number" name="parking_slots" placeholder="Parking Slots Available" value={formData.parking_slots} onChange={handleChange} className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700" required />
          <input type="number" name="slot_price" placeholder="Price per Parking Slot" value={formData.slot_price} onChange={handleChange} className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700" required />
          <select name="vehicle_type" value={formData.vehicle_type} onChange={handleChange} className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700" required>
            <option value="">Select Vehicle Type</option>
            <option value="Car">Car</option>
            <option value="2-wheeler">2-Wheeler</option>
            <option value="Truck">Truck</option>
            <option value="Bus">Bus</option>
          </select>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700" required />
          <button type="submit" className="w-full py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800">Register</button>
        </form>
        <div className="text-center mt-4">
          <Link to="/" className="inline-block px-6 py-2 bg-gray-300 text-blue-900 font-semibold rounded-lg hover:bg-gray-400 transition-colors duration-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OwnerRegister;