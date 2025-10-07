// backend/routes/ownerRoutes.js

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Owner from "../models/Owner.js";
import axios from "axios";

const router = express.Router();

// --- PROTECT MIDDLEWARE (to get owner data on dashboard) ---
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.owner = await Owner.findById(decoded.id).select("-password");
      if (!req.owner) {
        return res.status(401).json({ success: false, message: "Owner not found" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ success: false, message: "No token provided" });
  }
};

// --- HELPER FUNCTION (for geocoding) ---
const getCoordinatesFromAddress = async (address) => {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: { address, key: process.env.GOOGLE_MAPS_API_KEY }
      });
      const { results } = response.data;
      if (results && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        return { longitude: lng, latitude: lat };
      }
      return null;
    } catch (error) {
      throw new Error("Could not geocode the address.");
    }
};

// --- OWNER REGISTRATION ROUTE ---
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, address, parking_address, parking_slots, slot_price, vehicle_type } = req.body;

    const existingOwner = await Owner.findOne({ email });
    if (existingOwner) return res.status(400).json({ success: false, message: "Owner already exists" });

    const coordinates = await getCoordinatesFromAddress(parking_address);
    if (!coordinates) {
        return res.status(400).json({ success: false, message: "Invalid parking address." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const owner = await Owner.create({
      name, email, password: hashedPassword, phone, address, parking_address,
      parking_slots, slot_price, vehicle_type,
      location: { type: 'Point', coordinates: [coordinates.longitude, coordinates.latitude] }
    });

    const token = jwt.sign({ id: owner._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(201).json({ success: true, message: "Owner registered", token, owner });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- OWNER LOGIN ROUTE ---
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const owner = await Owner.findOne({ email });
    if (!owner) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: owner._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ success: true, token, owner });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- GET LOGGED-IN OWNER DETAILS ROUTE (for dashboard) ---
router.get("/me", protect, async (req, res) => {
  res.json({ success: true, owner: req.owner });
});

export default router;