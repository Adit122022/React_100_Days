"use client"
import React, { useState, useEffect } from 'react';

const Navigation = () => {
  const [time, setTime] = useState(new Date());

  // Real-time clock update
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).replace(" ", " ");
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <nav className="macos-navbar">
      {/* Left Side: Apple Menu & App Menus */}
      <div className="flex items-center gap-1">
        <div className="nav-item px-3">
          <img className="w-4 h-4 invert" src="./navbar-icons/apple.svg" alt="apple" />
        </div>
        <div className="flex items-center text-[13px] font-semibold tracking-wide">
          <p className="nav-item font-bold px-3">Finder</p>
          <div className="hidden md:flex">
            <p className="nav-item px-3">File</p>
            <p className="nav-item px-3">Edit</p>
            <p className="nav-item px-3">View</p>
            <p className="nav-item px-3">Go</p>
            <p className="nav-item px-3">Window</p>
            <p className="nav-item px-3">Help</p>
          </div>
        </div>
      </div>

      {/* Right Side: Status Icons & Time */}
      <div className="flex items-center gap-2 text-[13px] font-medium pr-4">
        <div className="nav-item px-2">
          <img className="w-4 h-4 invert" src="./navbar-icons/wifi.svg" alt="wifi" />
        </div>
        <div className="nav-item px-2 flex gap-2">
          <span>{formatDate(time)}</span>
          <span>{formatTime(time)}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;