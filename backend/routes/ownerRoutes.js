import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Owner from "../models/Owner.js";

const router = express.Router();

// Middleware to protect routes with JWT
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.owner = await Owner.findById(decoded.id).select("-password"); // Exclude password
      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ success: false, message: "No token provided" });
  }
};

// Owner Registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, parking_slots, slot_price, vehicle_type, parking_address } = req.body;

    const existingOwner = await Owner.findOne({ email });
    if (existingOwner) return res.status(400).json({ success: false, message: "Owner already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const owner = await Owner.create({
      name,
      email,
      password: hashedPassword,
      parking_slots,
      slot_price,
      vehicle_type,
      parking_address,
      slots_used: 0,
      total_earnings: 0,
    });

    // Auto-generate JWT token after registration
    const token = jwt.sign({ id: owner._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ success: true, message: "Owner registered", token, owner });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Owner Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const owner = await Owner.findOne({ email });
    if (!owner) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: owner._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ success: true, token, owner });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get logged-in owner details
router.get("/me", protect, async (req, res) => {
  res.json({ success: true, owner: req.owner });
});

export default router;