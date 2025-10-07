// backend/models/Owner.js

import mongoose from "mongoose";

const ownerSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: {type: String, required: true},
  address: { type: String, required: true }, // Added owner's home address
  parking_address: { type: String, required: true },

  // --- NEW FIELDS START ---
  location: {
    type: {
      type: String,
      enum: ['Point'], // 'location.type' must be 'Point'
      default: 'Point'
    },
    coordinates: {
      type: [Number], // Array of numbers for [longitude, latitude]
      required: true
    }
  },
  // --- NEW FIELDS END ---

  parking_slots: { type: Number, required: true },
  slot_price: { type: Number, required: true },
  vehicle_type: { type: String, required: true },
  slots_used: { type: Number, default: 0 },
  total_earnings: { type: Number, default: 0 },
}, { timestamps: true });

// Create a 2dsphere index for geospatial queries
ownerSchema.index({ location: '2dsphere' });

export default mongoose.model("Owner", ownerSchema);