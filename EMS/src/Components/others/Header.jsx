import React from "react";

const Header = ({changeUser}) => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 rounded-lg shadow-md">
      <div>
        <h1 className="text-xl md:text-2xl font-medium text-gray-100">
          Welcome Back,
        </h1>
        <span className="text-2xl md:text-3xl font-semibold text-emerald-400">
          {changeUser} 👋
        </span>
      </div>
      <button
        onClick={() => {
          localStorage.setItem('loggedInUser','')
          changeUser('')
        }}
        className="bg-red-600 hover:bg-red-700 text-white text-base md:text-lg font-medium px-4 md:px-6 py-2 rounded-lg transition duration-200"
      >
        Log Out
      </button>
    </header>
  );
};

export default Header;
