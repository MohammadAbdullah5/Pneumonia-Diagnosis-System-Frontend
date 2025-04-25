import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice'; // Ensure logout action exists

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const goToDashboard = () => {
    if (!currentUser) return;
    if (currentUser.role === 'doctor') {
      navigate('/dashboard');
    } else if (currentUser.role === 'admin') {
      navigate('/admin-dashboard');
    }  
    else {
      navigate('/home');
    }
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

        {currentUser && (
          <button
            onClick={goToDashboard}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Dashboard
          </button>
        )}

        {currentUser ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-medium"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/sign-in"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
          >
            Login
          </Link>
        )}
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center space-x-3">
        {!currentUser ? (
          <Link
            to="/sign-in"
            className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium text-sm"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 font-medium text-sm"
          >
            Logout
          </button>
        )}

        <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full right-4 mt-2 w-44 bg-white shadow-lg rounded-lg py-2 z-50 md:hidden">
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

          {currentUser && (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                goToDashboard();
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
            >
              Dashboard
            </button>
          )}

          {currentUser && (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;