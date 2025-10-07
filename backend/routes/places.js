import express from "express";
import axios from "axios";

const router = express.Router();

// GET /api/places?input=XYZ
router.get("/", async (req, res) => {
  const { input } = req.query;
  if (!input) return res.status(400).json({ success: false, message: "Input is required" });

  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/autocomplete/json",
      {
        params: {
          input,
          key: apiKey,
          types: "geocode",
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error("Places API error:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch places" });
  }
});

export default router;
