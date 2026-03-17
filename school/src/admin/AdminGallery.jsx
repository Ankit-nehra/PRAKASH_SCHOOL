import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import Navbar from "../components/layout/Navbar";
import imageCompression from "browser-image-compression";

function AdminGallery() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data } = await axios.get("/gallery");
      setImages(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 📸 Handle image select + preview + compression
  const handleImageChange = async (file) => {
    if (!file) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
      "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {
      return alert("Only JPG, PNG, GIF, WEBP allowed");
    }

    try {
      // Compress image
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      setImage(compressedFile);

      // Preview
      const previewUrl = URL.createObjectURL(compressedFile);
      setPreview(previewUrl);

    } catch (error) {
      console.error(error);
      alert("Image processing failed");
    }
  };

  // 🚀 Upload image with progress
  const uploadImage = async () => {
    if (!image || !category) {
      return alert("Select image and category");
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("category", category);

    try {
      setUploadProgress(0);

      await axios.post("/gallery", formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });

      // Reset
      setImage(null);
      setPreview(null);
      setCategory("");
      setUploadProgress(0);

      fetchImages();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Upload failed");
      setUploadProgress(0);
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await axios.delete(`/gallery/${id}`);
      fetchImages();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="pt-24 max-w-6xl mx-auto px-6">

        <h1 className="text-3xl font-bold text-blue-900 mb-8">
          Gallery Management
        </h1>

        {/* Upload Section */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Upload New Image</h2>

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
              className="border p-2 rounded w-full"
              onChange={(e) => handleImageChange(e.target.files[0])}
            />

            <select
              className="border p-2 rounded w-full md:w-60"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option>Events</option>
              <option>Campus</option>
              <option>Sports</option>
              <option>Classroom</option>
            </select>

            <button
              onClick={uploadImage}
              className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Upload Image
            </button>
          </div>

          {/* 🖼️ Preview */}
          {preview && (
            <div className="mt-4">
              <p className="text-sm mb-2">Preview:</p>
              <img
                src={preview}
                alt="preview"
                className="h-40 rounded-lg border"
              />
            </div>
          )}

          {/* 📊 Progress Bar */}
          {uploadProgress > 0 && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1">{uploadProgress}% uploaded</p>
            </div>
          )}
        </div>

        {/* Gallery */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div
              key={img._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={`https://prakash-school-server-ru7x.onrender.com/uploads/${img.image}`}
                alt={img.category}
                className="h-40 w-full object-cover"
              />

              <div className="p-3">
                <p className="text-sm text-gray-600 mb-2">
                  Category: <span className="font-medium">{img.category}</span>
                </p>

                <button
                  onClick={() => deleteImage(img._id)}
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default AdminGallery;
