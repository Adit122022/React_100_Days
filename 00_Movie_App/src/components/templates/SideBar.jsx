import { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white md:hidden shadow-md"
      >
        <i className={`ri-${isOpen ? "close-line" : "menu-line"} text-2xl`} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-[70%] sm:w-[50%] md:w-[20%] bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col z-40 transform transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <h1 className="flex items-center gap-3 text-2xl text-white font-mono font-bold tracking-tight mb-6">
          <i className="text-[#6556CD] ri-tv-fill text-3xl animate-pulse"></i>
          <span className="hover:text-[#6556CD] transition-colors duration-200">
            StarStream
          </span>
        </h1>

        {/* Navigation */}
        <nav className="flex flex-col text-zinc-300 text-base gap-1 mb-8">
          <h2 className="text-white font-semibold text-lg mb-3 tracking-wide">
            New Feeds
          </h2>

          {[
            { to: "/trending", icon: "ri-fire-fill", label: "Trending" },
            { to: "/popular", icon: "ri-bard-fill", label: "Popular" },
            { to: "/movie", icon: "ri-film-line", label: "Movies" },
            { to: "/tvshows", icon: "ri-tv-2-fill", label: "TV Shows" },
            { to: "/people", icon: "ri-team-line", label: "People" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-3 py-2 active:bg-[#4b3f9b] active:text-white"
            >
              <i className={`${item.icon} text-lg`} /> {item.label}
            </Link>
          ))}
        </nav>

        <hr className="border-none h-[1px] bg-zinc-700 mb-8" />

        <nav className="flex flex-col text-zinc-300 text-base gap-1">
          <h2 className="text-white font-semibold text-lg mb-3 tracking-wide">
            Insights Cool
          </h2>

          {[
            { to: "/contact", icon: "ri-phone-fill", label: "Contact Us" },
            { to: "/about", icon: "ri-information-fill", label: "About Us" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-3 py-2 active:bg-[#4b3f9b] active:text-white"
            >
              <i className={`${item.icon} text-lg`} /> {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
        ></div>
      )}
    </>
  );
};

export default SideBar;
