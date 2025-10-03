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
app.use(cors({ origin: "http://localhost:5173" })); // front-end origin (Vite)
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("API running"));

// API routes
app.use("/api/users", userRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/otp", otpRoutes);

// Start server and connect MongoDB
const PORT = process.env.PORT || 5001;
mongoose.set('strictQuery', false); // optional, avoid deprecation warning
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));