import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import { motion } from "framer-motion";

function Gallery() {

  const [images,setImages] = useState([]);
  const [filter,setFilter] = useState("All");

  const categories = ["All","Events","Campus","Sports","Classroom"];

  useEffect(()=>{
    fetchImages();
  },[]);

  const fetchImages = async()=>{
    const res = await axios.get("https://prakash-school-server-ru7x.onrender.com/api/gallery");
    setImages(res.data);
  };

  const filteredImages =
    filter === "All"
      ? images
      : images.filter(img => img.category === filter);

  return (
    <div>

      <Navbar />

      <div className="pt-24 max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          School Gallery
        </h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map(cat=>(
            <button
              key={cat}
              onClick={()=>setFilter(cat)}
              className={`px-5 py-2 rounded-full border ${
                filter === cat
                  ? "bg-blue-900 text-white"
                  : "bg-white hover:bg-blue-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <PhotoProvider>

          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">

            {filteredImages.map(img=>(
              <PhotoView
                key={img._id}
                src={`https://prakash-school-server-ru7x.onrender.com/uploads/${img.image}`}
              >

                <motion.div
                  layout
                  className="mb-4 cursor-pointer overflow-hidden rounded-xl shadow-lg group relative"
                >

                  <img
                    src={`https://prakash-school-server-ru7x.onrender.com/uploads/${img.image}`}
                    className="w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center">

                    <span className="text-white font-semibold">
                      {img.category}
                    </span>

                  </div>

                </motion.div>

              </PhotoView>
            ))}

          </div>

        </PhotoProvider>

      </div>

      <Footer />

    </div>
  );
}

export default Gallery;
