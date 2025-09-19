import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
//   console.log(data);
  return (
 <div
  style={{
    background: `linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(https://image.tmdb.org/t/p/original/${
      data.backdrop_path || data.profile_path || "/fallback-image.jpg"
    })`,
    backgroundPosition: "center", 
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  }}
  className="w-full h-[60vh] md:h-[70vh] flex flex-col p-[6%] md:p-[8%] justify-end items-start relative overflow-hidden"
>
  {/* Overlay with subtle grain effect */}
  <div className="absolute inset-0 bg-black/15 backdrop-brightness-100 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-[length:200px_200px] opacity-30"></div>

  {/* Content */}
  <div className="relative z-10 w-full max-w-[90%] md:max-w-[80%]">
    <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 animate-slide-up">
      {data.name || data.original_title || "Untitled"}
    </h1>
    <p className="text-zinc-100 text-xs sm:text-sm md:text-base font-light leading-relaxed mb-4 line-clamp-3">
      {data.overview?.slice(0, 300) || "No description available."}
      <Link
        to={`/${data.media_type}/details/${data.id}`}
        className="text-blue-300 hover:text-blue-400 font-medium transition-colors duration-300 ml-2 underline underline-offset-4"
      >
        ...more
      </Link>
    </p>
    <div className="flex items-center gap-3 text-zinc-100 text-xs sm:text-sm font-medium mt-2 animate-slide-up animation-delay-200">
      <div className="flex items-center gap-2">
        <i className="text-yellow-400 ri-megaphone-fill text-base"></i>
        <span>{data.release_date ? data.release_date : "No Info"}</span>
      </div>
      <span className="text-zinc-400">|</span>
      <div className="flex items-center gap-2">
        <i className="text-yellow-400 ri-album-fill text-base"></i>
        <span>{data.media_type?.toUpperCase() || "UNKNOWN"}</span>
      </div>
    </div>

    <div className="flex gap-4 mt-6 animate-slide-up animation-delay-400">
      <Link
        to={`/${data.media_type}/details/${data.id}`}
        className="text-white bg-[#6556CD] hover:bg-[#4b3f9b] px-5 py-2.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
      >
        Watch Trailer
      </Link>
      <Link
        to={`/${data.media_type}/details/${data.id}`}
        className="text-white border border-zinc-300 hover:border-blue-400 hover:text-blue-400 px-5 py-2.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
      >
        View Details
      </Link>
    </div>
  </div>
</div>
  );
};

export default Header;
