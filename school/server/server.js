import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/achievements", achievementRoutes);
// Default port fallback
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
