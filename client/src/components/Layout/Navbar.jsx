import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun, Github, Menu, X } from "lucide-react";
import { ToggleTheme } from "../../context/UserContext";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser as ClerkUser,
} from "@clerk/clerk-react";

const NavLink = ({ onClick, href, children, darkMode }) => {
  const base = `text-sm font-medium transition-colors duration-150 ${
    darkMode
      ? "text-gray-400 hover:text-white"
      : "text-gray-500 hover:text-gray-900"
  }`;

  if (href) {
    return (
      <Link to={href} className={base}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={base}>
      {children}
    </button>
  );
};

const Navbar = () => {
  const { darkMode, toggleTheme } = ToggleTheme();
  const { user } = ClerkUser();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleProtectedRoute = (route) => {
    navigate(user ? route : "/sign-in");
    setMobileOpen(false);
  };

  const isAdmin = user?.primaryEmailAddress?.emailAddress.endsWith("@iiitdwd.ac.in");

  return (
    <nav
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-200 ${
        darkMode
          ? "bg-[#0B0D14]/90 border-gray-800"
          : "bg-white/90 border-gray-200"
      }`}
    >
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => { navigate("/"); setMobileOpen(false); }}>
            <lord-icon
              src="https://cdn.lordicon.com/ugllxeyl.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#107c91,secondary:#66a1ee"
              style={{ width: 38, height: 38 }}
            />
            <span
              className={`font-display text-xl font-bold tracking-tight ${
                darkMode ? "text-white" : "text-gray-950"
              }`}
            >
              MediaHub
            </span>
          </div>

          {/* ── Desktop nav links ── */}
          <div className="items-center hidden gap-7 md:flex">
            <NavLink href="/" darkMode={darkMode}>Home</NavLink>
            <NavLink onClick={() => handleProtectedRoute("/docs")} darkMode={darkMode}>Docs</NavLink>
            <NavLink onClick={() => handleProtectedRoute("/video-streaming")} darkMode={darkMode}>Videos</NavLink>
            <NavLink onClick={() => handleProtectedRoute("/media")} darkMode={darkMode}>Editor Studio</NavLink>
            {isAdmin && (
              <NavLink href="/admin" darkMode={darkMode}>Admin</NavLink>
            )}
          </div>

          {/* ── Right controls ── */}
          <div className="flex items-center gap-2">

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* GitHub */}
            <button
              aria-label="GitHub"
              onClick={() => window.open("https://github.com/ANAS727189/MediaHub/tree/master")}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Github className="w-4 h-4" />
            </button>

            {/* Auth — desktop only */}
            <div className="items-center hidden gap-3 ml-1 md:flex">
              <SignedIn>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {user?.firstName || user?.username || "Welcome"}
                  </span>
                  <UserButton />
                </div>
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <button className="px-4 py-1.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors">
                    Sign in
                  </button>
                </SignInButton>
              </SignedOut>
            </div>

            {/* Mobile menu toggle */}
            <button
              className={`md:hidden p-2 rounded-lg transition-colors ${
                darkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div
          className={`md:hidden border-t ${
            darkMode ? "bg-[#0B0D14] border-gray-800" : "bg-white border-gray-200"
          }`}
        >
          <div className="flex flex-col gap-1 px-6 py-4">
            {[
              { label: "Home", action: () => { navigate("/"); setMobileOpen(false); } },
              { label: "Docs", action: () => handleProtectedRoute("/docs") },
              { label: "Videos", action: () => handleProtectedRoute("/video-streaming") },
              { label: "Editor Studio", action: () => handleProtectedRoute("/media") },
              ...(isAdmin ? [{ label: "Admin", action: () => { navigate("/admin"); setMobileOpen(false); } }] : []),
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  darkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className={`mt-3 border-t pt-3 ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <SignedIn>
                <div className="flex items-center gap-3 px-3">
                  <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {user?.firstName || user?.username || "Welcome"}
                  </span>
                  <UserButton />
                </div>
              </SignedIn>
              <SignedOut>
                <div className="px-3">
                  <SignInButton>
                    <button className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors">
                      Sign in
                    </button>
                  </SignInButton>
                </div>
              </SignedOut>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;