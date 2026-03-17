import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/notices", noticeRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
