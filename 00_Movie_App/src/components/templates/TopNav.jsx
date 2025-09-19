import axios from "../../utils/Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "../../assets/noimage.jpg";

const TopNav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const getSearch = async () => {
    if (query.trim() === "") {
      setSearches([]);
      return;
    }
    try {
      const response = await axios.get(`/search/multi?query=${query}`);
      setSearches(response.data.results);
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };

  useEffect(() => {
    if (query.trim().length > 0) {
      getSearch();
    } else {
      setSearches([]);
    }
  }, [query]);

  return (
    <div className="w-full flex justify-center items-center relative mb-4 px-4">
  {/* Search Input Container */}
  <div className="flex items-center w-full md:w-[60%] lg:w-[50%] px-4 py-2 rounded-xl border border-zinc-700 bg-zinc-900/50 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-zinc-500">
    <i className="text-zinc-400 text-xl ri-search-line"></i>
    <input
      onChange={(e) => setQuery(e.target.value)}
      value={query}
      className="flex-1 text-zinc-100 mx-3 py-2 text-base sm:text-lg outline-none border-none bg-transparent placeholder-zinc-500 transition-colors duration-200"
      type="text"
      placeholder="Search movies, shows, or people..."
    />
    {query.length > 0 && (
      <i
        onClick={() => setQuery("")}
        className="text-zinc-400 text-xl ri-close-fill cursor-pointer hover:text-zinc-200 transition-colors duration-200"
      />
    )}
  </div>

  {/* Search Dropdown */}
  {searches.length > 0 && (
    <div className="z-[100] absolute w-full md:w-[60%] lg:w-[50%] rounded-xl max-h-[60vh] bg-zinc-900/90 backdrop-blur-md shadow-2xl border border-zinc-700 top-[110%] left-0 md:left-auto md:right-auto overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800 animate-slide-down">
      {searches.map((s) => (
        <Link
          to={`/${s.media_type}/details/${s.id}`}
          key={s.id}
          className="flex items-center gap-4 p-3 hover:bg-zinc-700/70 text-zinc-100 font-medium text-sm sm:text-base border-b border-zinc-700/50 transition-all duration-200 hover:scale-[1.02] rounded-lg"
        >
          <img
            className="w-16 h-10 sm:w-20 sm:h-12 object-cover rounded-md shadow-sm"
            src={
              s.backdrop_path || s.profile_path
                ? `https://image.tmdb.org/t/p/w200/${s.backdrop_path || s.profile_path}`
                : noimage
            }
            alt={s.name || s.original_title || "No image available"}
            loading="lazy"
          />
          <div className="flex flex-col">
            <span className="line-clamp-1">{s.name || s.original_title || "Untitled"}</span>
            <span className="text-xs text-zinc-400">
              {s.media_type?.toUpperCase() || "UNKNOWN"} •{" "}
              {s.release_date || s.first_air_date || "No Date"}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )}
</div>
  );
};

export default TopNav;