import Gallery from "../models/Gallery.js";
import fs from "fs";

// GET all images
export const getImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD image
export const addImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!req.body.category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const newImage = new Gallery({
      image: req.file.filename,
      category: req.body.category,
    });

    await newImage.save();
    res.json(newImage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE image + file from server
export const deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete file from uploads folder
    const filePath = `uploads/${image.image}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await image.deleteOne();

    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
