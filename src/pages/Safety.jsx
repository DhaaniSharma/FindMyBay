import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaTwitter, FaInstagram, FaSun, FaMoon } from 'react-icons/fa';

const Safety = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Theme-based classes
  const themeClass = isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black';
  const headerThemeClass = isDarkMode ? 'bg-gray-800' : 'bg-blue-100';
  const headerTextClass = isDarkMode ? 'text-white' : 'text-blue-900';
  const goButtonClass = isDarkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white';
  const cardClass = isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black';

  return (
    <div className={`min-h-screen ${themeClass} font-inter`}>
      {/* Navbar */}
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
            <Link to="/safety" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300">Safety</Link>
            <a href="#footer" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 cursor-pointer">Contact Us</a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center p-8 gap-8">
        {/* Page Header */}
        <div className={`p-10 rounded-xl shadow-lg max-w-3xl text-center ${cardClass}`}>
          <h1 className="text-4xl font-bold mb-6 text-blue-900">Safety Guidelines</h1>

          {/* Safety Concerns */}
          <section className="mb-6 text-left">
            <h2 className="text-2xl font-semibold mb-3">Safety Concerns</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Always park in designated areas to avoid accidents or fines.</li>
              <li>Be aware of surroundings and follow traffic rules.</li>
              <li>Do not leave valuables in the vehicle unattended.</li>
              <li>Follow the app’s guidance and avoid risky shortcuts.</li>
            </ul>
          </section>

          {/* Dos and Don'ts */}
          <section className="text-left">
            <h2 className="text-2xl font-semibold mb-3">Dos & Don'ts</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Do:</strong> Use the app to find available parking spots efficiently.</li>
              <li><strong>Do:</strong> Keep your vehicle locked and secure.</li>
              <li><strong>Do:</strong> Report any unsafe situations via the app.</li>
              <li><strong>Don't:</strong> Park in prohibited or unsafe areas.</li>
              <li><strong>Don't:</strong> Ignore the app’s safety alerts and notifications.</li>
            </ul>
          </section>

          {/* Back Button */}
          <div className="mt-8">
            <Link to="/" className={`inline-block px-6 py-3 ${goButtonClass} font-semibold rounded-lg hover:bg-blue-700/90 transition-colors duration-300`}>
              Go Back to Home
            </Link>
          </div>
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

export default Safety;