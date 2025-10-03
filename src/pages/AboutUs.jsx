import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaTwitter, FaInstagram, FaSun, FaMoon } from 'react-icons/fa';

const AboutUs = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Theme-based classes
  const themeClass = isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black';
  const headerThemeClass = isDarkMode ? 'bg-gray-800' : 'bg-blue-100';
  const headerTextClass = isDarkMode ? 'text-white' : 'text-blue-900';
  const goButtonClass = isDarkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white';

  return (
    <div className={`min-h-screen ${themeClass} font-inter`}>
      {/* Navbar Section */}
      <header className={`${headerThemeClass} ${headerTextClass} shadow-lg`}>
        <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <Link to="/" className="bg-blue-600 rounded-full px-4 py-2 cursor-pointer">
            <h1 className="text-xl font-bold text-white">FindMyBay</h1>
          </Link>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-300"
            >
              {isDarkMode ? <FaSun className="text-yellow-400 text-2xl" /> : <FaMoon className="text-gray-400 text-2xl" />}
            </button>
            <Link to="/about-us" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300">About Us</Link>
            <a href="#" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300">Safety</a>
            <a href="#footer" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 cursor-pointer">Contact Us</a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center p-8">
        <div className={`bg-white p-10 rounded-xl shadow-lg max-w-2xl text-center ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
          <h1 className="text-4xl font-bold mb-4 text-blue-900">About Us</h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Welcome to <strong>Smart Parking</strong>, your smart solution for hassle-free parking in the city. Our mission is to simplify the parking experience by providing real-time information on available parking spots, helping you save time and reduce stress.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            We use a network of sensors and data analytics to give you accurate information, making sure you find the perfect spot every time. Whether you're a daily commuter or an occasional visitor, we're here to make your journey smoother.
          </p>
          <Link to="/" className={`inline-block px-6 py-3 ${goButtonClass} font-semibold rounded-lg hover:bg-blue-700/90 transition-colors duration-300`}>
            Go Back to Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer id="footer" className={`${headerThemeClass} ${headerTextClass} py-4 text-center mt-12`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <Link to="/" className="bg-blue-600 rounded-full px-4 py-2 cursor-pointer">
            <p className="text-xl font-bold text-white">FindMyBay</p>
          </Link>
          <div className="flex space-x-4 text-xl">
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaWhatsapp />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaInstagram />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;