import mongoose from "mongoose";

const ownerSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: {type: String, required: true}, 
  parking_slots: { type: Number, required: true },
  slot_price: { type: Number, required: true },
  vehicle_type: { type: String, required: true },
  parking_address: { type: String, required: true },
  slots_used: { type: Number, default: 0 },
  total_earnings: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Owner", ownerSchema); 