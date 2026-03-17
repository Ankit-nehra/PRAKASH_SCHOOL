import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function GalleryPreview() {

  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const res = await axios.get("http://localhost:5000/api/gallery");

    const data = res.data;

    // categories we want
    const categories = ["Events", "Classroom", "Sports", "Campus"];

    // pick first image from each category
    const previewImages = categories.map(cat =>
      data.find(img => img.category === cat)
    ).filter(Boolean);

    setImages(previewImages);
  };

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">
          School Gallery
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">

          {images.map((img) => (
            <Link key={img._id} to="/gallery">

              <div className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer">

                <img
                  src={`http://localhost:5000/uploads/${img.image}`}
                  alt={img.category}
                  loading="lazy"
                  className="w-full h-52 object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {img.category}
                  </span>
                </div>

              </div>

            </Link>
          ))}

        </div>

        <div className="text-center">
          <Link to="/gallery">
            <button className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition shadow-md">
              View Full Gallery
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}

export default GalleryPreview;