import React, { useState } from "react";

const Dropdown = ({ title, options, func }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(title);

  const handleSelect = (value) => {
    setSelected(value);
    func(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full sm:w-56">
      {/* Dropdown Button */}
      <button
        type="button"
        className="w-full px-4 py-2 flex justify-between items-center rounded-lg border border-white/20 text-white 
                   bg-zinc-800/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#6556CD] 
                   transition-all duration-300 hover:bg-zinc-700/50 active:scale-[0.98] select-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="font-medium tracking-wide">
          {selected || "Select a category"}
        </span>
        <i
          className={`ri-arrow-${isOpen ? "up" : "down"}-s-line text-white text-lg transition-transform duration-300`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute mt-2 w-full rounded-lg shadow-xl border border-white/10 bg-zinc-900/90 backdrop-blur-md 
                    overflow-hidden transition-all duration-300 origin-top z-20 
                    ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}`}
        role="listbox"
      >
        {options.map((o, i) => (
          <div
            key={i}
            role="option"
            className="px-4 py-2 text-white text-sm hover:bg-[#6556CD]/80 hover:text-white 
                       transition-colors cursor-pointer select-none"
            onClick={() => handleSelect(o)}
          >
            {o.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
