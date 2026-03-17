import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  image: String,
  category: String,
});

export default mongoose.model("Gallery", gallerySchema);