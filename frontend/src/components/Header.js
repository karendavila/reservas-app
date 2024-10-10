import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router
import ucvlogo from '../assets/ucvlogo1.png'; // Update the path to your logo

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={ucvlogo} alt="Logo" className="h-10 mr-2" />
          <span className="text-white text-xl font-bold">UCV Events</span>
        </div>

        {/* Menu */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/events" className="text-white hover:text-gray-300">
            Events
          </Link>
          <Link to="/rooms" className="text-white hover:text-gray-300">
            Rooms
          </Link>
          <Link to="/login" className="text-white hover:text-gray-300">
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700">
          <Link to="/" className="block px-4 py-2 text-white hover:bg-blue-600">
            Home
          </Link>
          <Link
            to="/events"
            className="block px-4 py-2 text-white hover:bg-blue-600"
          >
            Events
          </Link>
          <Link
            to="/rooms"
            className="block px-4 py-2 text-white hover:bg-blue-600"
          >
            Rooms
          </Link>
          <Link
            to="/login"
            className="block px-4 py-2 text-white hover:bg-blue-600"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
