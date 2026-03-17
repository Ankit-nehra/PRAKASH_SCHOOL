import Notice from "../models/Notice.js"; // updated model with new fields
import multer from "multer";
import fs from "fs";
import path from "path";

// Multer setup for image & file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "image") {
    if (!file.mimetype.startsWith("image/")) return cb(new Error("Only images allowed"), false);
  }
  if (file.fieldname === "attachment") {
    if (
      ![
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.mimetype)
    ) {
      return cb(new Error("Only PDF/DOCX allowed"), false);
    }
  }
  cb(null, true);
};

export const upload = multer({ storage, fileFilter });

// Get all notices
export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new notice
export const addNotice = async (req, res) => {
  try {
    const { title, description, date, marker } = req.body;

    const image = req.files?.image ? req.files.image[0].filename : null;
    const attachment = req.files?.attachment ? req.files.attachment[0].filename : null;

    const notice = new Notice({
      title,
      description,
      date,
      marker: marker === "true" || marker === true,
      image,
      attachment,
    });

    await notice.save();
    res.status(201).json(notice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Delete notice
export const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);

    // Remove uploaded files if exist
    if (notice?.image) fs.unlinkSync(path.join("uploads", notice.image));
    if (notice?.attachment) fs.unlinkSync(path.join("uploads", notice.attachment));

    res.json({ message: "Notice deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};