import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  date: { type: String, required: true },
  marker: { type: Boolean, default: false }, // high importance
  image: { type: String, default: null },     // optional image filename
  attachment: { type: String, default: null },// optional file (PDF/DOCX)
});

export default mongoose.model("Notice", noticeSchema);