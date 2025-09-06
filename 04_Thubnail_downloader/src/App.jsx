import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";
import "animate.css";
import getYouTubeID from "get-youtube-id";
import { ToastContainer, toast } from "react-toastify";

// 🔹 Thumbnail Card Component
const ThumbnailCard = ({ item }) => {
  return (
    <div className="relative group rounded-2xl shadow-md overflow-hidden bg-white animate__animated animate__fadeInUp">
      {/* Thumbnail */}
      <div className="overflow-hidden">
        <img
          src={item.url}
          className="w-full aspect-video object-cover transform group-hover:scale-110 transition-transform duration-500"
          alt="YouTube Thumbnail"
        />
      </div>

      {/* Overlay with Download */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <h1 className="text-lg font-semibold text-white drop-shadow-md mb-4">
          {item.width}x{item.height}
        </h1>
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          <button className="py-2 px-5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-medium shadow hover:scale-105 transition-all duration-300">
            <i className="ri-download-line mr-1"></i>
            Download
          </button>
        </a>
      </div>
    </div>
  );
};

// 🔹 Search Bar Component
const SearchBar = ({ url, setUrl, fetchThumbnail }) => {
  return (
    <form
      className="flex flex-col md:flex-row items-center gap-4 mt-10 justify-center"
      onSubmit={fetchThumbnail}
    >
      <input
        type="url"
        className="bg-white/20 backdrop-blur-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 p-3 rounded-xl w-[90%] md:w-[450px] text-gray-800 shadow-sm"
        required
        placeholder="Paste YouTube video URL..."
        onChange={(e) => setUrl(e.target.value)}
        value={url}
      />
      <button className="p-3 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium shadow-md hover:scale-105 transition-all duration-300">
        <i className="ri-search-line mr-1"></i>
        Search
      </button>
    </form>
  );
};

// 🔹 Header Component
const Header = () => {
  return (
    <header className="text-center mt-6 animate__animated animate__fadeInDown">
      <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
        YouTube Thumbnail Downloader
      </h1>
      <p className="mt-3 text-gray-700 text-lg">
        Quickly fetch and download high-quality thumbnails 🚀
      </p>
    </header>
  );
};

const App = () => {
  const urlModel = [
    { width: 120, height: 90, url: "https://img.youtube.com/vi", filename: "default.jpg" },
    { width: 320, height: 180, url: "https://img.youtube.com/vi", filename: "mqdefault.jpg" },
    { width: 480, height: 360, url: "https://img.youtube.com/vi", filename: "hqdefault.jpg" },
    { width: 640, height: 480, url: "https://img.youtube.com/vi", filename: "sddefault.jpg" },
    { width: 1280, height: 720, url: "https://img.youtube.com/vi", filename: "maxresdefault.jpg" },
  ];

  const [url, setUrl] = useState("");
  const [thumbnails, setThumbnails] = useState([]);

  const fetchThumbnail = (e) => {
    e.preventDefault();
    const videoId = getYouTubeID(url);
    if (videoId) {
      const model = urlModel.map((item) => {
        return {
          ...item,
          url: `${item.url}/${videoId}/${item.filename}`,
        };
      });
      setThumbnails(model);
    } else {
      toast.error("Invalid YouTube video URL ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 py-8 px-4">
      <Header />
      <SearchBar url={url} setUrl={setUrl} fetchThumbnail={fetchThumbnail} />

      {thumbnails.length > 0 ? (
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-[95%] md:w-10/12 mx-auto">
          {thumbnails.map((item, index) => (
            <ThumbnailCard item={item} key={index} />
          ))}
        </div>
      ):(<p className="text-center text-slate-500 uppercase mt-20">PAste YOur YoutUbe Link</p>)}

      <ToastContainer />
    </div>
  );
};

export default App;
