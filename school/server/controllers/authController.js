import Admin from "../models/admin.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const loginAdmin = async (req, res) => {
  try {
    // Trim inputs to avoid leading/trailing spaces
    const username = req.body.username?.trim();
    const password = req.body.password?.trim();

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    // Check password
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Create JWT using secret from .env
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};