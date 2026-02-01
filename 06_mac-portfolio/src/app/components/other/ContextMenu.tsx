"use client"; // Ye zaroori hai event handlers ke liye
import React from 'react';

interface ContextMenuProps {
    x: number;
    y: number;
    onClose: () => void;
    onChangeWallpaper: () => void;
}

// Named export aur default dono ka setup kar dete hain taaki koi error na aaye
export const ContextMenu = ({ x, y, onClose, onChangeWallpaper }: ContextMenuProps) => {
    const menuItems = [
        { label: "New Folder", action: () => console.log("New Folder") },
        { label: "Get Info", action: () => console.log("Info") },
        { label: "Change Wallpaper...", action: onChangeWallpaper, border: true },
        { label: "Use Stacks", action: () => console.log("Stacks") },
        { label: "Sort By", action: () => console.log("Sort") },
        { label: "Clean Up", action: () => console.log("Clean"), border: true },
        { label: "Show View Options", action: () => console.log("Options") },
    ];

    return (
        <>
            {/* Overlay to close menu */}
            <div
                className="fixed inset-0 z-[199]"
                onClick={onClose}
                onContextMenu={(e) => { e.preventDefault(); onClose(); }}
            />

            <div
                className="fixed z-[200] w-64 max-w-[90vw] bg-[#1e1e1e]/70 backdrop-blur-2xl border border-white/10 rounded-lg py-1.5 shadow-2xl text-white select-none animate-in fade-in zoom-in duration-150"
                style={{ top: y, left: x }}
            >
                {menuItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                item.action();
                                onClose();
                            }}
                            className="px-3 py-1.5 mx-1 rounded-md hover:bg-blue-600 text-[13px] font-medium flex justify-between cursor-default transition-colors"
                        >
                            <span>{item.label}</span>
                        </div>
                        {item.border && <div className="h-[0.5px] bg-white/10 my-1 mx-3" />}
                    </React.Fragment>
                ))}
            </div>
        </>
    );
};

export default ContextMenu;