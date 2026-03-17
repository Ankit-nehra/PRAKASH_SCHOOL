import Gallery from "../models/gallery.js";

export const getImages = async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addImage = async (req, res) => {
  try {
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

export const deleteImage = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};