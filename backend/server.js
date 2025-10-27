// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";

dotenv.config();
connectDB();

const app = express();

// --- LOGGING ADDED ---
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] INCOMING REQUEST: ${req.method} ${req.originalUrl}`);
  next();
});
// --- END LOGGING ---

app.use(cors({ origin: "http://localhost:5173" })); // Using your friend's original, correct code
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("API running"));

app.use("/api/users", userRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/otp", otpRoutes);

const PORT = process.env.PORT || 5001;
mongoose.set('strictQuery', false);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


hello hello 