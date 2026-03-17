import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import Navbar from "../components/layout/Navbar";

function AdminGallery() {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);

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

  const uploadImage = async () => {
    if (!image || !category) return alert("Select image and category");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("category", category);

    try {
      await axios.post("/gallery", formData);
      setImage(null);
      setCategory("");
      fetchImages();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
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

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-blue-900 mb-8">
          Gallery Management
        </h1>

        {/* Upload Section */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Upload New Image</h2>

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="file"
              className="border p-2 rounded w-full"
              onChange={(e) => setImage(e.target.files[0])}
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
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {images.map((img) => (
            <div
              key={img._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={`https://prakash-school-server-ru7x.onrender.com/${img.image}`}
                alt={img.category}
                className="h-40 w-full object-cover hover:scale-105 transition"
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
