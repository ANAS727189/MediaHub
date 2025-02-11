import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, Moon, Sun, Github, Menu, X } from "lucide-react";
import { ToggleTheme } from "../../context/UserContext";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser as ClerkUser,
} from "@clerk/clerk-react";

const Navbar = () => {
  const { darkMode, toggleTheme } = ToggleTheme();
  const { user } = ClerkUser();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleProtectedRoute = (route) => {
    if (user) {
      navigate(route);
    } else {
      navigate("/sign-in");
    }
    setIsMobileMenuOpen(false); // close mobile menu after navigation
  };

  return (
    <nav
      className={`bg-${darkMode ? "gray-900" : "white"} shadow-md transition-all duration-300 ease-in-out`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Home Link */}
          <div className="flex items-center space-x-2">
            <lord-icon
              src="https://cdn.lordicon.com/ugllxeyl.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#107c91,secondary:#66a1ee"
              style={{ width: 50, height: 50 }}
            ></lord-icon>
            <h1
              className={`text-2xl cursor-pointer font-extrabold tracking-tight text-${darkMode ? "white" : "gray-900"} hover:text-yellow-500 transition-all duration-300`}
              onClick={() => {
                navigate("/");
                setIsMobileMenuOpen(false);
              }}
            >
              MediaHub
            </h1>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className={`text-${darkMode ? "white" : "gray-900"} font-medium hover:text-blue-500 transition-colors`}
            >
              Home
            </Link>
            <button
              onClick={() => handleProtectedRoute("/docs")}
              className={`text-${darkMode ? "white" : "gray-900"} font-medium hover:text-blue-500 transition-colors`}
            >
              Docs
            </button>
            <button
              onClick={() => handleProtectedRoute("/video-streaming")}
              className={`text-${darkMode ? "white" : "gray-900"} font-medium hover:text-blue-500 transition-colors`}
            >
              Videos
            </button>
            <button
              onClick={() => handleProtectedRoute("/media")}
              className={`text-${darkMode ? "white" : "gray-900"} font-medium hover:text-blue-500 transition-colors`}
            >
              Editor Studio
            </button>
            {user?.primaryEmailAddress?.emailAddress.endsWith(
              "@iiitdwd.ac.in"
            ) && (
              <Link
                to="/admin"
                className={`text-${darkMode ? "white" : "gray-900"} font-medium hover:text-blue-500 transition-colors`}
              >
                Admin Panel
              </Link>
            )}
          </div>

          {/* Search, Notifications, Theme Toggle, GitHub, and Mobile Toggle */}
          <div className="flex items-center space-x-4">


            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              aria-label="Toggle Theme"
            >
              {darkMode ? (
                <Sun className="w-6 h-6 text-yellow-500" />
              ) : (
                <Moon className="w-6 h-6 text-gray-600" />
              )}
            </button>

            <Github
              className={`rounded-full transition cursor-pointer ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
              onClick={() =>
                window.open(
                  "https://github.com/ANAS727189/MediaHub/tree/master"
                )
              }
            />

            {/* Desktop User Section */}
            <div className="hidden md:flex items-center">
              <SignedIn>
                <div className="flex items-center space-x-4">
                  <span className={`text-${darkMode ? "white" : "gray-900"} font-medium`}>
                    Welcome, {user?.firstName || user?.username || "User"}!
                  </span>
                  <UserButton />
                </div>
              </SignedIn>
              <SignedOut>
                <SignInButton className="text-white font-bold" />
              </SignedOut>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle Menu">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 py-4 space-y-2 bg-gray-100 dark:bg-gray-800">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block text-${darkMode ? "white" : "gray-900"} font-medium hover:text-blue-500 transition-colors`}
          >
            Home
          </Link>
          <button
            onClick={() => handleProtectedRoute("/docs")}
            className={`block text-${darkMode ? "white" : "gray-900"} font-medium hover:text-blue-500 transition-colors`}
          >
            Docs
          </button>
          <button
            onClick={() => handleProtectedRoute("/video-streaming")}
            className={`block text-${darkMode ? "white" : "gray-900"} font-medium hover:text-blue-500 transition-colors`}
          >
            Videos
          </button>
          <button
            onClick={() => handleProtectedRoute("/media")}
            className={`block text-${darkMode ? "white" : "gray-900"} font-medium hover:text-blue-500 transition-colors`}
          >
            Editor Studio
          </button>
          {user?.primaryEmailAddress?.emailAddress.endsWith("@iiitdwd.ac.in") && (
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block text-${darkMode ? "white" : "gray-900"} font-medium hover:text-blue-500 transition-colors`}
            >
              Admin Panel
            </Link>
          )}
          {/* Mobile User Section */}
          <div className="mt-4">
            <SignedIn>
              <div className="flex flex-col space-y-2">
                <span className={`text-${darkMode ? "white" : "gray-900"} font-medium`}>
                  Welcome, {user?.firstName || user?.username || "User"}!
                </span>
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton className="block w-full text-center py-2 bg-blue-600 text-white font-bold rounded-md" />
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
