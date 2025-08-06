import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Images/logo.png";
import AIChatBox from "../pages/AIChatBox";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    
    window.addEventListener("storage", handleStorageChange);

    // Check if user is already set in localStorage
    const checkUser = () => {
      const current = localStorage.getItem("user");
      setUser(current ? JSON.parse(current) : null);
    };
    checkUser();

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Post Product", to: "/create-product" },
    { name: "Post Job", to: "/create-job" },
    { name: "AI Advisor", action: "toggleAI" },
  ];

  return (
    <header className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-1 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="flex transition duration-300 ease-in-out hover:scale-105 hover:border-4 hover:border-white items-center gap-2"
        >
          <img src={logo} alt="Logo" className="h-14 w-25" />
        </Link>

        {/* Hamburger (Mobile) */}
        <button
          className="sm:hidden text-white ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-5 ml-auto">
          <nav className="flex items-center gap-5">
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.name}
                  to={link.to}
                  className="hover:border hover:border-white rounded px-3 py-1 text-yellow-300 transition-all duration-300"
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => {
                    if (link.action === "toggleAI") setShowAI((prev) => !prev);
                  }}
                  className="hover:border text-yellow-300 hover:border-white rounded px-3 py-1 transition-all duration-300"
                >
                  {link.name}
                </button>
              )
            )}

            {user ? (
              <>
                <span className="text-green-400 font-medium">
                  👋 {user.name}
                </span>
                <Link
                  to="/my-products"
                  className="px-3 hover:border hover:border-yellow-400 text-yellow-300 hover:text-yellow-400"
                >
                  🛍 My Products
                </Link>
                <Link
                  to="/my-jobs"
                  className="px-3 hover:border hover:border-yellow-400 text-yellow-300 hover:text-yellow-400"
                >
                  💼 My Jobs
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:scale-105 hover:border-4 hover:border-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:scale-105 hover:border-4 hover:border-white"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.name}
                  to={link.to}
                  className="hover:border hover:border-white rounded px-3 py-2 transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => {
                    setMenuOpen(false);
                    if (link.action === "toggleAI") setShowAI((prev) => !prev);
                  }}
                  className="hover:border hover:border-white rounded px-3 py-2 transition-all duration-300"
                >
                  {link.name}
                </button>
              )
            )}

            {user ? (
              <>
                <span className="text-green-400 font-medium">
                  👋 {user.name}
                </span>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:scale-105 hover:border-4 hover:border-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:scale-105 hover:border-4 hover:border-white"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}

      {/* AI Chat Box */}
      {showAI && <AIChatBox />}
    </header>
  );
};

export default Header;
