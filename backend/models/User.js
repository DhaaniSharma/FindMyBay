import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: String,
  car_number: String,
  car_details: String,
}, { timestamps: true });

export default mongoose.model("User", userSchema);