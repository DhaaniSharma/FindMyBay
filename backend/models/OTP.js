import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  contact: { type: String, required: true }, // email or phone
  otp: { type: String, required: true },
  type: { type: String, enum: ["email", "phone"], required: true },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model("OTP", otpSchema);