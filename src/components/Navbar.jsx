import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="relative flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <Link to="/">
        <h1 className="text-2xl font-bold text-blue-600">PneumoScan</h1>
      </Link>

      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-4 items-center">
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
          Home
        </Link>
        <Link to="/how-it-works" className="text-gray-700 hover:text-blue-600 font-medium">
          How It Works
        </Link>
        <Link to="/about-us" className="text-gray-700 hover:text-blue-600 font-medium">
          About Us
        </Link>
        <Link
          to="/sign-in"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
        >
          Get Started
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center space-x-3">
        <Link
          to="/sign-in"
          className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium text-sm"
        >
          Get Started
        </Link>
        <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full right-4 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50 md:hidden">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
          >
            Home
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
          >
            How It Works
          </Link>
          <Link
            to="/about-us"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
          >
            About Us
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
