// src/pages/HomePage.jsx - FINAL VERSION with Vehicle Icons

import React, { useState, useRef } from "react";
import { FaWhatsapp, FaTwitter, FaInstagram, FaSun, FaMoon } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Autocomplete } from "@react-google-maps/api";

const HomePage = () => {
  // All your state and functions remain the same
  const [searchForm, setSearchForm] = useState({ name: "", destination: "", city: "" });
  const [ownerLogin, setOwnerLogin] = useState({ email: "", password: "" });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const ownerLoginRef = useRef(null);
  const navigate = useNavigate();
  const [autocomplete, setAutocomplete] = useState(null);
  const onLoad = (autocompleteInstance) => { setAutocomplete(autocompleteInstance); };
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const destinationName = place.formatted_address || place.name;
      console.log("Selected Place:", destinationName);
      setSearchForm(prevForm => ({ ...prevForm, destination: destinationName }));
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };
  const handleSearchChange = (e) => setSearchForm({ ...searchForm, [e.target.name]: e.target.value });
  const handleOwnerLoginChange = (e) => setOwnerLogin({ ...ownerLogin, [e.target.name]: e.target.value });
  const handleOwnerClick = () => ownerLoginRef.current?.scrollIntoView({ behavior: "smooth" });
  const handleSearchSubmit = (e) => {
  e.preventDefault();
  navigate('/search-results', { state: { searchForm: searchForm } });
  };
  const handleContactUsClick = () => document.querySelector("footer")?.scrollIntoView({ behavior: "smooth" });
 // In src/pages/HomePage.jsx

const handleLoginSubmit = async (e) => {
  e.preventDefault(); 
  try {
    const res = await axios.post("http://localhost:5001/api/owners/login", ownerLogin);

    if (res.data.success) {
      localStorage.setItem("ownerToken", res.data.token);
      localStorage.setItem("ownerDetails", JSON.stringify(res.data.owner));

      navigate("/owner-dashboard");

    } else {
      alert(res.data.message || "Login failed!");
    }
  } catch (err) {
    alert(err.response?.data?.message || "Login error");
  }
};
  const themeClass = isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black";
  const cardThemeClass = isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black";
  const inputClass = "w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-700";
  const goButtonClass = "bg-blue-900 text-white hover:bg-blue-800";
  const ownerButtonClass = "border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white";
  
  // --- NEW DATA STRUCTURE FOR VEHICLES ---
  const vehicleTypes = [
    { name: "Bike", imageSrc: "/bike.png" },
    { name: "Car", imageSrc: "/car.png" },
    { name: "Truck", imageSrc: "/truck.png" },
    { name: "Bus", imageSrc: "/bus.png" },
  ];

  return (
    <div className={`min-h-screen ${themeClass} font-inter`}>
      {/* Header is unchanged */}
      <header className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-blue-100 text-blue-900"} shadow-lg`}>
        <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <Link to="/" className="bg-blue-900 rounded-full px-4 py-2 text-white font-bold">FindMyBay</Link>
          <div className="flex space-x-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-300">
              {isDarkMode ? <FaSun className="text-yellow-400 text-2xl" /> : <FaMoon className="text-gray-400 text-2xl" />}
            </button>
            <Link to="/about-us" className="px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">About Us</Link>
            <a onClick={handleContactUsClick} className="px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer">Contact Us</a>
            <Link to="/login" className={`px-4 py-2 rounded-lg font-semibold ${goButtonClass}`}>Log In / Register</Link>
          </div>
        </nav>
      </header>

      {/* Main Content is unchanged */}
      <main className="flex flex-col lg:flex-row items-center justify-center p-8 lg:p-16 gap-12">
        <section className={`${cardThemeClass} p-8 rounded-2xl shadow-xl w-full lg:w-1/3 max-w-sm`}>
          <h2 className="text-2xl font-semibold mb-6 text-center">Find a Spot</h2>
          <form className="space-y-6" onSubmit={handleSearchSubmit}>
            <input type="text" name="name" placeholder="Name" value={searchForm.name} onChange={handleSearchChange} className={inputClass} />
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <input type="text" name="destination" placeholder="Destination" value={searchForm.destination} onChange={handleSearchChange} className={inputClass} />
            </Autocomplete>
            <input type="text" name="city" placeholder="City" value={searchForm.city} onChange={handleSearchChange} className={inputClass} />
            <button type="submit" className={`w-full p-3 rounded-lg font-semibold ${goButtonClass}`}>Go!</button>
            <Link to="/owner-register" className={`w-full p-3 rounded-lg border-2 ${ownerButtonClass} font-semibold mt-2 text-center block`}>Owner?</Link>
          </form>
        </section>
        <section className={`p-8 rounded-2xl shadow-xl w-full lg:w-2/3 max-w-xl flex items-center justify-center ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <img 
                src="/FindMyBay.png" 
                alt="FindMyBay Logo" 
                className="max-w-full h-auto max-h-full object-contain"
            />
        </section>
      </main>
      
      {/* --- MODIFIED VEHICLE BUTTONS SECTION --- */}
      <section className="flex flex-wrap justify-center p-8 gap-6">
        {vehicleTypes.map((vehicle) => (
          <button 
            key={vehicle.name} 
            className="p-4 rounded-xl border-2 border-blue-900 bg-gray-100 hover:bg-blue-100 transition-all duration-300 cursor-pointer flex items-center justify-center w-32 h-24"
          >
            <img 
              src={vehicle.imageSrc} 
              alt={vehicle.name} 
              className="h-16 object-contain" // Controls the size of the image inside the button
            />
          </button>
        ))}
      </section>
      {/* --- END OF MODIFIED SECTION --- */}

      {/* Rest of the page is unchanged */}
      <section ref={ownerLoginRef} className="flex justify-center p-8">
        <div className={`${cardThemeClass} p-8 rounded-2xl shadow-xl border border-blue-900 w-full lg:w-1/3 max-w-sm`}>
          <h3 className="text-xl font-semibold mb-4 text-center">Owner Login</h3>
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <input type="email" name="email" placeholder="Email" value={ownerLogin.email} onChange={handleOwnerLoginChange} className={inputClass} required />
            <input type="password" name="password" placeholder="Password" value={ownerLogin.password} onChange={handleOwnerLoginChange} className={inputClass} required />
            <div className="flex justify-between mt-4 gap-2">
              <button type="submit" className="flex-1 py-3 rounded-lg bg-blue-900 text-white font-semibold hover:bg-blue-800 transition-colors duration-300">Log In</button>
              <Link to="/owner-register" className="flex-1 py-3 rounded-lg bg-blue-900 text-white font-semibold hover:bg-blue-800 transition-colors duration-300 text-center">Register →</Link>
            </div>
          </form>
        </div>
      </section>
      <footer className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-blue-100 text-blue-900"} py-4 text-center`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <Link to="/" className="bg-blue-900 rounded-full px-4 py-2 text-white font-bold">FindMyBay</Link>
          <div className="flex space-x-4 text-xl">
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400"><FaWhatsapp /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400"><FaInstagram /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;