import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const OwnerDashboard = () => {
  const [ownerData, setOwnerData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOwnerData = async () => {
      const token = localStorage.getItem("ownerToken");
      if (!token) {
        navigate("/"); // Redirect to home if no token
        return;
      }

      try {
        const res = await axios.get("http://localhost:5001/api/owners/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOwnerData(res.data.owner);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch owner data. Please login again.");
        navigate("/"); // Redirect on error
      }
    };

    fetchOwnerData();
  }, [navigate]);

  if (!ownerData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-200 p-6 font-inter">
      <div className="max-w-3xl mx-auto bg-gray-100 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Hi {ownerData.name} 👋</h1>
        <p className="text-gray-700 mb-6">Welcome to your Owner Dashboard.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white rounded-lg shadow flex justify-between">
            <span className="font-semibold">Total Parking Slots:</span>
            <span>{ownerData.parking_slots}</span>
          </div>
          <div className="p-4 bg-white rounded-lg shadow flex justify-between">
            <span className="font-semibold">Slots Used:</span>
            <span>{ownerData.slots_used}</span>
          </div>
          <div className="p-4 bg-white rounded-lg shadow flex justify-between">
            <span className="font-semibold">Slots Available:</span>
            <span>{ownerData.parking_slots - ownerData.slots_used}</span>
          </div>
          <div className="p-4 bg-white rounded-lg shadow flex justify-between">
            <span className="font-semibold">Price per Slot:</span>
            <span>₹{ownerData.slot_price}</span>
          </div>
          <div className="p-4 bg-white rounded-lg shadow md:col-span-2">
            <span className="font-semibold">Total Earnings:</span>
            <span>₹{ownerData.total_earnings}</span>
          </div>
          <div className="p-4 bg-white rounded-lg shadow md:col-span-2">
            <span className="font-semibold">Parking Address:</span>
            <p>{ownerData.parking_address}</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;