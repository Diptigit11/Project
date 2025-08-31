import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isActive = (path) => location.pathname === path;

  // Check if token exists on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]); // re-check on route change

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-[#012A4A] to-[#013A5A] fixed top-0 left-0 w-full z-50 shadow-lg border-b border-blue-900/20 font-sans">
      <div className="w-full max-w-none px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Brand */}
          <div className="flex items-center space-x-3">
            <span className="text-white font-bold text-2xl tracking-wide">
              Mock<span className="text-yellow-400">Interview</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-12">
            <ul className="flex space-x-10 items-center text-white font-bold">
              <li>
                <Link
                  to="/interview"
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                    isActive("/interview")
                      ? "text-yellow-400 bg-white/10"
                      : "hover:text-yellow-300"
                  }`}
                >
                  Interview
                  {isActive("/interview") && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 rounded-full"></div>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                    isActive("/about")
                      ? "text-yellow-400 bg-white/10"
                      : "hover:text-yellow-300"
                  }`}
                >
                  About Us
                  {isActive("/about") && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 rounded-full"></div>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/resume-analyzer"
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                    isActive("/analyzer")
                      ? "text-yellow-400 bg-white/10"
                      : "hover:text-yellow-300"
                  }`}
                >
                  Resume Analyzer
                  {isActive("/analyzer") && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 rounded-full"></div>
                  )}
                </Link>
              </li>
            </ul>

            {isLoggedIn ? (
              <>
                {/* Profile Icon */}
                <div className="relative">
                  <Link to="/profile">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt="Profile"
                      className="h-8 w-8 object-contain"
                    />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
                  </Link>
                </div>
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#012A4A] px-6 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500  text-[#012A4A] px-6 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#012A4A] px-6 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="lg:hidden text-white">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
            >
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  isMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#013A5A] px-6 py-4 space-y-3 text-white font-medium border-t border-blue-800/30">
          <Link
            to="/interview"
            className={`block px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/10 ${
              isActive("/interview")
                ? "text-yellow-400 bg-white/10"
                : "hover:text-yellow-300"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Interview
          </Link>
          <Link
            to="/about"
            className={`block px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/10 ${
              isActive("/about")
                ? "text-yellow-400 bg-white/10"
                : "hover:text-yellow-300"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/analyzer"
            className={`block px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/10 ${
              isActive("/analyzer")
                ? "text-yellow-400 bg-white/10"
                : "hover:text-yellow-300"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Resume Analyzer
          </Link>

          {isLoggedIn ? (
            <>
              <div className="relative">
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="Profile"
                    className="h-8 w-8 object-contain"
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
                </Link>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#012A4A] py-3 rounded-lg font-bold text-sm uppercase tracking-wide hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 mt-4"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#012A4A] py-3 rounded-lg font-bold text-sm uppercase tracking-wide hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#012A4A] py-3 rounded-lg font-bold text-sm uppercase tracking-wide hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
