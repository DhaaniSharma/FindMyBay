import mongoose from "mongoose";

const parkingUsageSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
  slot_number: { type: Number, required: true },
  is_occupied: { type: Boolean, default: false },
  earned: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("ParkingUsage", parkingUsageSchema);