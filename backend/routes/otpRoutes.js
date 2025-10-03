import express from "express";
import { sendOtp, verifyOtp } from "../utils/sendOtp.js";

const router = express.Router();

// Send OTP
router.post("/send", async (req, res) => {
  const { contact, type } = req.body;
  try {
    const result = await sendOtp(contact, type);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify OTP
router.post("/verify", async (req, res) => {
  const { contact, otp, type } = req.body;
  try {
    const verified = await verifyOtp(contact, otp, type);
    if (verified) return res.json({ message: "OTP verified" });
    res.status(400).json({ error: "Invalid or expired OTP" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;