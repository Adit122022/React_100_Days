import React, { useState } from "react";

const WhiteBoard = () => {
  const [bg, setBg] = useState("#fff");
  const [input, setInput] = useState("");

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    let value = pasted;

    // If it's "background: ...;"
    if (pasted.toLowerCase().startsWith("background")) {
      const idx = pasted.indexOf(":");
      value = pasted.slice(idx + 1).replace(/;$/, "").trim();
    }

    // If it's Tailwind like bg-[...]
    if (pasted.startsWith("bg-[")) {
      const inside = pasted.match(/bg-\[(.+)\]/);
      console.log(inside)
      if (inside) value = inside[1];
    }

    if (!value) return;

    setBg(value);
    setInput(pasted);
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">📝 WhiteBoard</h2>

      <div
        onPaste={handlePaste}
        contentEditable
        suppressContentEditableWarning
        className="w-full h-[220px] border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none p-4 flex items-center justify-center text-gray-600"
        style={{ background: bg }}
      >
        {!input && "Paste your CSS or Tailwind background here"}
      </div>

      {input && (
        <p className="mt-2 text-sm text-gray-500 break-all">
          📋 Last input: <code>{input}</code>
        </p>
      )}
    </div>
  );
};

export default WhiteBoard;
