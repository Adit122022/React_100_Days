import React, { useEffect, useState } from "react";
import "animate.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "remixicon/fonts/remixicon.css";

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("nature");

  const fetchImage = async () => {
    try {
      setLoading(true);
      const options = { headers: { Authorization: API_KEY } };
      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=22`,
        options
      );
     setPhotos((prev) => {
  const newPhotos = [...prev, ...res.data.photos];
  return Array.from(new Map(newPhotos.map(p => [p.id, p])).values());
 
});
    } catch (err) {
      toast.error("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  const search = (e) => {
    e.preventDefault();
    const q = e.target[0].value.trim();
    if (!q) return;
    setPhotos([]);
    setQuery(q);
    setPage(1);
  };

  useEffect(() => {
    fetchImage();
  }, [page, query]);

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center animate__animated animate__fadeIn">
      {/* Navbar */}
      <nav className="sticky top-0 w-full bg-white/90 backdrop-blur shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-5 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Brand */}
          <h1 className="text-2xl font-bold text-neutral-800 tracking-tight">
            📌 PinGallery
          </h1>

          {/* Search */}
          <form
            onSubmit={search}
            className="flex w-full md:w-1/2 rounded-full overflow-hidden border border-neutral-300 bg-white shadow-sm"
          >
            <input
              className="flex-1 p-3 text-neutral-700 placeholder-neutral-400 focus:outline-none"
              placeholder="Search for inspiration..."
              required
            />
            <button className="bg-neutral-800 text-white px-6 font-medium hover:bg-neutral-700 transition-colors">
              <i className="ri-search-line"></i>
            </button>
          </form>
        </div>
      </nav>

      {/* Title under nav */}
      <h2 className="mt-8 text-2xl md:text-3xl font-semibold text-neutral-800 text-center">
        Results for <span className="text-rose-500 capitalize">{query}</span>
      </h2>

      {/* No Results */}
      {photos.length === 0 && !loading && (
        <h1 className="text-lg md:text-xl font-medium text-neutral-500 mt-12">
          No results found for <span className="italic">"{query}"</span>
        </h1>
      )}

      {/* Masonry Grid (Pinterest Style) */}
      <div className="mt-10 w-full max-w-7xl columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 px-4">
        {photos.map((item, index) => (
          <div
            key={index}
            className="break-inside-avoid bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
          >
            <div className="relative">
              <img
              loading="lazy"
                src={item.src.large}
                alt={item.alt}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <a
                  href={item.src.original}
                  target="_blank"
                  className="bg-white px-4 py-2 rounded-full shadow text-sm font-medium text-neutral-800 hover:bg-neutral-100 transition"
                >
                  <i className="ri-download-line mr-1"></i> Download
                </a>
              </div>
            </div>
            <div className="p-3">
              <h1 className="text-sm font-medium text-neutral-700 truncate">
                {item.photographer}
              </h1>
            </div>
          </div>
        ))}
      </div>

      {/* Loader */}
      {loading && (
        <i className="ri-loader-4-line text-4xl text-rose-500 animate-spin mt-10"></i>
      )}

      {/* Load More */}
      {photos.length > 0 && !loading && (
        <button
          onClick={() => setPage(page + 1)}
          className="mt-10 mb-12 bg-neutral-800 py-3 px-10 rounded-full font-medium text-white shadow hover:bg-neutral-700 transition-colors"
        >
          Load More
        </button>
      )}

      <ToastContainer />
    </div>
  );
};

export default App;
