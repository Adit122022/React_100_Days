import axios from "../../utils/Axios";
import { useEffect, useState } from "react";
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
    <div className="relative w-full flex justify-center px-3 sm:px-6 py-4">
      {/* Search Input */}
      <div className="flex items-center w-full sm:w-[80%] md:w-[60%] lg:w-[50%] px-4 py-2 rounded-2xl border border-zinc-700 bg-zinc-900/70 backdrop-blur-md shadow-lg transition duration-300 focus-within:border-zinc-400">
        <i className="text-zinc-400 text-xl ri-search-line"></i>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          placeholder="Search movies, shows, or people..."
          className="flex-1 text-zinc-100 mx-3 py-1 text-sm sm:text-base bg-transparent outline-none placeholder-zinc-500"
        />
        {query.length > 0 && (
          <i
            onClick={() => setQuery("")}
            className="text-zinc-400 text-xl ri-close-fill cursor-pointer hover:text-zinc-200 transition"
          />
        )}
      </div>

      {/* Search Results Dropdown */}
      {searches.length > 0 && (
        <div className="absolute top-full mt-3 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] bg-zinc-900/95 backdrop-blur-md border border-zinc-700 rounded-2xl shadow-2xl max-h-[65vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800 z-50 animate-slide-down">
          {searches.map((s) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={s.id}
              className="flex items-center gap-4 p-3 hover:bg-zinc-800/70 transition-colors border-b border-zinc-700/40 last:border-none"
            >
              <img
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/w200/${s.backdrop_path || s.profile_path}`
                    : noimage
                }
                alt={s.name || s.original_title || "No image available"}
                loading="lazy"
                className="w-16 h-10 sm:w-20 sm:h-12 object-cover rounded-md shadow-sm"
              />
              <div className="flex flex-col overflow-hidden">
                <span className="text-zinc-100 text-sm sm:text-base font-medium truncate">
                  {s.name || s.original_title || "Untitled"}
                </span>
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
