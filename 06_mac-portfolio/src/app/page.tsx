"use client"
import { useState } from "react";
import ContextMenu from "./components/other/ContextMenu";

const wallpapersList = [
  "./mac-wallpaper.jpg",
  "./spiderman.jpg",
];

const Page = () => {
  const [wallpaper, setWallpaper] = useState(wallpapersList[0]);
  const [menu, setMenu] = useState<{ x: number, y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Right click detected at:", e.pageX, e.pageY); // Debugging ke liye
    setMenu({ x: e.pageX, y: e.pageY });
  };

  const nextWallpaper = () => {
    const idx = wallpapersList.indexOf(wallpaper);
    setWallpaper(wallpapersList[(idx + 1) % wallpapersList.length]);
  };

  return (
    // 'fixed inset-0' ensures ye poori screen cover kare navigation ke peeche bhi
    <main
      onContextMenu={handleContextMenu}
      style={{ backgroundImage: `url("${wallpaper}")` }}
      className="fixed inset-0 bg-center bg-cover bg-no-repeat transition-all duration-700 ease-in-out z-0 flex items-center justify-center"
    >
      <h1 className="text-white/10 text-9xl font-bold select-none pointer-events-none">
        ADITYA
      </h1>

      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          onClose={() => setMenu(null)}
          onChangeWallpaper={nextWallpaper}
        />
      )}
    </main>
  );
}

export default Page;