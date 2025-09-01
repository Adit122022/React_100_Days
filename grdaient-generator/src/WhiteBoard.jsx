import React, { useState } from "react";

const WhiteBoard = () => {
  const [bg, setBg] = useState("#fff");

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    let value = pasted;

    if (pasted.toLowerCase().startsWith("background")) {
      const idx = pasted.indexOf(":");
      value = pasted.slice(idx + 1).replace(/;$/, "").trim(); // remove leading "background:" and trailing ";"
    }

    // Optional: basic guard
    if (!value) return;

    setBg(value);
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">📝 WhiteBoard</h2>

      {/* Keep it empty inside to avoid React's contentEditable warning about children */}
      <div
        onPaste={handlePaste}
        contentEditable
        suppressContentEditableWarning
        className="w-full h-[220px] border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none p-4 flex items-center justify-center text-gray-600"
        style={{ background: bg }}
      >
        {/* Placeholder text is just plain text node, not React-managed children */}
        Paste your CSS background here 
      </div>
    </div>
  );
};

export default WhiteBoard;
