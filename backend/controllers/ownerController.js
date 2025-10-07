// backend/controllers/ownerController.js

import Owner from '../models/Owner.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const getCoordinatesFromAddress = async (address) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: process.env.GOOGLE_MAPS_API_KEY,
      }
    });

    const { results } = response.data;
    if (results && results.length > 0) {
      const { lat, lng } = results[0].geometry.location;
      // MongoDB requires [longitude, latitude]
      return { longitude: lng, latitude: lat };
    }
    return null;
  } catch (error) {
    console.error("Error fetching coordinates from Google:", error.message);
    throw new Error("Could not geocode the address.");
  }
};


export const registerOwner = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address, // Owner's home address
      parking_address,
      parking_slots,
      slot_price,
      vehicle_type
    } = req.body;

    // 1. Check if owner already exists
    const existingOwner = await Owner.findOne({ email });
    if (existingOwner) {
      return res.status(400).json({ success: false, message: "Owner with this email already exists." });
    }

    // 2. Get coordinates for the parking address
    const coordinates = await getCoordinatesFromAddress(parking_address);
    if (!coordinates) {
        return res.status(400).json({ success: false, message: "Could not find coordinates for the provided parking address." });
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create the new owner object with location data
    const newOwner = new Owner({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      parking_address,
      location: {
        type: 'Point',
        coordinates: [coordinates.longitude, coordinates.latitude] // [lng, lat]
      },
      parking_slots,
      slot_price,
      vehicle_type
    });

    // 5. Save the new owner to the database
    await newOwner.save();

    // 6. Generate a JWT token
    const token = jwt.sign({ id: newOwner._id, type: 'owner' }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // 7. Send back a successful response
    res.status(201).json({
      success: true,
      message: "Owner registered successfully!",
      token,
      owner: {
        id: newOwner._id,
        name: newOwner.name,
        email: newOwner.email
      }
    });

  } catch (error) {
    console.error("Owner registration error:", error);
    res.status(500).json({ success: false, message: "Server error during registration." });
  }
};

// You can add login and other functions here later