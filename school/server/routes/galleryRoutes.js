import express from "express";
import multer from "multer";
import { protect } from "../middleware/authMiddleware.js";
import { getImages, addImage, deleteImage } from "../controllers/galleryController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage });

router.get("/", getImages);
router.post("/", protect, upload.single("image"), addImage);
router.delete("/:id", protect, deleteImage);

export default router;