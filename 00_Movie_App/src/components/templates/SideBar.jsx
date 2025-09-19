import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-[20%] h-full bg-zinc-900 border-r-2 border-zinc-800 p-6 flex flex-col">
  {/* Sidebar Header */}
  <h1 className="flex items-center gap-3 text-2xl text-white font-mono font-bold tracking-tight">
    <i className="text-[#6556CD] ri-tv-fill text-3xl animate-pulse"></i>
    <span className="hover:text-[#6556CD] transition-colors duration-200">StarStream</span>
  </h1>

  {/* Navigation */}
  <nav className="flex flex-col text-zinc-300 text-md gap-2 mt-10 mb-4">
    <h2 className="text-white font-semibold text-lg mb-3 tracking-wide">New Feeds</h2>

    <Link
      to="/trending"
      className="flex items-center gap-2 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-2 active:bg-[#4b3f9b] active:text-white"
    >
      <i className="ri-fire-fill"></i> Trending
    </Link>
    <Link
      to="/popular"
      className="flex items-center gap-2 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-2 active:bg-[#4b3f9b] active:text-white"
    >
      <i className="ri-bard-fill"></i> Popular
    </Link>
    <Link
      to="/movie"
      className="flex items-center gap-2 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-2 active:bg-[#4b3f9b] active:text-white"
    >
      <i className="ri-film-line"></i> Movies
    </Link>
    <Link
      to="/tvshows"
      className="flex items-center gap-2 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-2 active:bg-[#4b3f9b] active:text-white"
    >
      <i className="ri-tv-2-fill"></i> TV Shows
    </Link>
    <Link
      to="/people"
      className="flex items-center gap-2 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-2 active:bg-[#4b3f9b] active:text-white"
    >
      <i className="ri-team-line"></i> People
    </Link>
  </nav>

  <hr className="border-none h-[1px] bg-zinc-700" />

  <nav className="flex flex-col text-zinc-300 text-md gap-2 mt-8">
    <h2 className="text-white font-semibold text-lg mb-3 tracking-wide">Insights Cool</h2>

    <Link
      to="/contact"
      className="flex items-center gap-2 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-2 active:bg-[#4b3f9b] active:text-white"
    >
      <i className="ri-phone-fill"></i> Contact Us
    </Link>
    <Link
      to="/about"
      className="flex items-center gap-2 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-2 active:bg-[#4b3f9b] active:text-white"
    >
      <i className="ri-information-fill"></i> About Us
    </Link>
  </nav>
</div>
  );
};

export default SideBar;
