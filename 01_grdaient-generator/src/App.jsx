import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WhiteBoard from "./WhiteBoard"; // 👈 import new component

const App = () => {
  const [num, setNum] = useState(12);
  const [type, setType] = useState("linear");
  const [gradients, setGradients] = useState([]);

  const getHexColoeCode = () => {
    const rgb = 255 * 255 * 255;
    const colorHex = Math.floor(Math.random() * rgb)
      .toString(16)
      .padStart(6, "0");
    return `#${colorHex}`;
  };

  const generateGradient = () => {
    const colors = [];
    for (let i = 0; i < num; i++) {
      const color1 = getHexColoeCode();
      const color2 = getHexColoeCode();
      const deg = Math.floor(Math.random() * 360);

      if (type === "linear") {
        colors.push({
          gradient: `linear-gradient(${deg}deg, ${color1}, ${color2})`,
          css: `background: linear-gradient(${deg}deg, ${color1}, ${color2});`,
        });
      } else {
        colors.push({
          gradient: `radial-gradient(circle, ${color1}, ${color2})`,
          css: `background: radial-gradient(circle, ${color1}, ${color2});`,
        });
      }
    }
    setGradients(colors);
  };

  const onCopy = (css) => {
    navigator.clipboard.writeText(css);
    toast.success("Gradient code copied!", { position: "top-center" });
  };

  useEffect(() => {
    generateGradient();
  }, [num, type]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* WhiteBoard at Top */}
        <WhiteBoard />

        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
          🎨 Gradient Generator
        </h1>

        {/* Controls Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-wrap gap-4 justify-center items-center mb-10">
          <input
            value={num}
            onChange={(e) => setNum(Number(e.target.value))}
            placeholder="12"
            type="number"
            className="border border-gray-300 rounded-lg w-[120px] p-2 text-center focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={type}
            className="border border-gray-300 rounded-lg w-[140px] p-2 focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </select>
          <button
            onClick={generateGradient}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium shadow hover:bg-blue-600 transition"
          >
            🔄 Regenerate
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gradients.map((item, id) => (
            <div
              key={id}
              className="h-[200px] rounded-xl shadow-lg relative group overflow-hidden"
              style={{ background: item.gradient }}
            >
              {/* Copy button */}
              <button
                onClick={() => onCopy(item.css)}
                className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition"
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
