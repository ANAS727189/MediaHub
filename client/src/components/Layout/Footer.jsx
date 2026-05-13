import React from "react";
import { Github, Twitter, Linkedin } from "lucide-react";
import { ToggleTheme } from "../../context/UserContext";

const Footer = () => {
  const { darkMode } = ToggleTheme();

  return (
    <footer
      className={`border-t transition-colors duration-200 ${
        darkMode
          ? "bg-[#0B0D14] border-gray-800"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">

          {/* Brand */}
          <div className="flex items-center gap-2">
            <lord-icon
              src="https://cdn.lordicon.com/ugllxeyl.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#107c91,secondary:#66a1ee"
              style={{ width: 30, height: 30 }}
            />
            <span
              className={`font-display text-lg font-bold ${
                darkMode ? "text-white" : "text-gray-950"
              }`}
            >
              MediaHub
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Contact Us"].map((label) => (
              <a
                key={label}
                href="#"
                className={`text-sm transition-colors ${
                  darkMode
                    ? "text-gray-600 hover:text-gray-300"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { href: "https://github.com/ANAS727189/", Icon: Github, label: "GitHub" },
              { href: "https://x.com/Anas_is_me", Icon: Twitter, label: "Twitter" },
              { href: "https://www.linkedin.com/in/anas-khan83/", Icon: Linkedin, label: "LinkedIn" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode
                    ? "text-gray-600 hover:text-white hover:bg-gray-800"
                    : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <div
          className={`mt-8 pt-6 border-t text-center text-xs ${
            darkMode
              ? "border-gray-800 text-gray-500"
              : "border-gray-100 text-gray-400"
          }`}
        >
          © 2025 MediaHub. All rights reserved. Built with React, Node.js &amp; Cloudinary.
        </div>
      </div>
    </footer>
  );
};

export default Footer;