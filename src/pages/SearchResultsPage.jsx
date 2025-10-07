// src/pages/SearchResultsPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaTwitter, FaInstagram, FaSun, FaMoon } from "react-icons/fa"; // Added necessary icons

const SearchResultsPage = () => {
  // --- Copied from HomePage.jsx ---
  const [isDarkMode, setIsDarkMode] = useState(false);
  const themeClass = isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black";
  const goButtonClass = "bg-blue-900 text-white hover:bg-blue-800";

  const handleContactUsClick = () => {
    // This will look for a footer on this page. We can add one later if needed.
    const footer = document.querySelector("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn("No footer on this page to scroll to.");
    }
  };
  // --- End of Copied Code ---

  return (
    <div className={`min-h-screen ${themeClass} font-inter`}>
      {/* --- Copied Header JSX from HomePage.jsx --- */}
      <header className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-blue-100 text-blue-900"} shadow-lg`}>
        <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <Link to="/" className="bg-blue-900 rounded-full px-4 py-2 text-white font-bold">FindMyBay</Link>
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-300">
              {isDarkMode ? <FaSun className="text-yellow-400 text-2xl" /> : <FaMoon className="text-gray-400 text-2xl" />}
            </button>
            <Link to="/about-us" className="px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">About Us</Link>
            <a onClick={handleContactUsClick} className="px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer">Contact Us</a>
            <Link to="/login" className={`px-4 py-2 rounded-lg font-semibold ${goButtonClass}`}>Log In / Register</Link>
          </div>
        </nav>
      </header>
      {/* --- End of Copied Header --- */}

      {/* Page Content */}
      <main className="p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Available Parking Spots
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-center">Search results will appear here...</p>
        </div>

        <div className="text-center mt-8">
          <Link to="/" className="inline-block px-6 py-2 bg-gray-300 text-blue-900 font-semibold rounded-lg hover:bg-gray-400">
            ← Start a New Search
          </Link>
        </div>
      </main>
    </div>
  );
};

export default SearchResultsPage;