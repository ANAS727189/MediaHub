import React from "react";
import { Link } from "react-router-dom";
import { Search, Bell, Moon, Sun } from "lucide-react";
import { ToggleTheme } from "../../context/UserContext";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser as ClerkUser,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { darkMode, toggleTheme } = ToggleTheme();
  const { user } = ClerkUser();

  const navigate = useNavigate();

  return (
    <nav
      className={`bg-${
        darkMode ? "gray-900" : "white"
      } shadow-md transition-all duration-300 ease-in-out`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and VideoStream side by side */}
          <div className="flex items-center space-x-2">
            <lord-icon
              src="https://cdn.lordicon.com/ugllxeyl.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#107c91,secondary:#66a1ee"
              style={{ width: 50, height: 50 }}
            ></lord-icon>
            <h1
              className={`text-2xl cursor-pointer font-extrabold tracking-tight text-${
                darkMode ? "white" : "gray-900"
              } hover:text-yellow-500 transition-all duration-300`}
              onClick={() => navigate("/")}
            >
              MediaHub
            </h1>
          </div>

          {/* Links */}
          <div className="flex space-x-6 items-center">
            <Link
              to="/"
              className={`text-${
                darkMode ? "white" : "gray-900"
              } font-medium hover:text-blue-500 transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/docs"
              className={`text-${
                darkMode ? "white" : "gray-900"
              } font-medium hover:text-blue-500 transition-colors`}
            >
              Docs
            </Link>
            <Link
              to="/video-streaming"
              className={`text-${
                darkMode ? "white" : "gray-900"
              } font-medium hover:text-blue-500 transition-colors`}
            >
              Videos
            </Link>
            <Link
              to="/media"
              className={`text-${
                darkMode ? "white" : "gray-900"
              } font-medium hover:text-blue-500 transition-colors`}
            >
              Editor Studio
            </Link>

            {user?.primaryEmailAddress?.emailAddress.endsWith(
              "@iiitdwd.ac.in"
            ) && (
              <Link
                to="/admin"
                className={`text-${
                  darkMode ? "white" : "gray-900"
                } font-medium hover:text-blue-500 transition-colors`}
              >
                Admin Panel
              </Link>
            )}
          </div>

          {/* Search, Notifications, and User Area */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search videos..."
                className={`w-56 px-4 py-2 rounded-full border ${
                  darkMode
                    ? "bg-gray-900 text-white border-gray-700"
                    : "bg-gray-100 text-gray-900 border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" />
            </div>

            {/* Notification Icon */}
            <button
              className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              aria-label="Notifications"
            >
              <Bell className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>

            {/* Dark/Light Mode Toggle */}
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

            {/* User Section */}
            <SignedIn>
              <div className="flex items-center space-x-4">
                <span
                  className={`text-${
                    darkMode ? "white" : "gray-900"
                  } font-medium`}
                >
                  Welcome, {user?.firstName || user?.username || "User"}!
                </span>
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
