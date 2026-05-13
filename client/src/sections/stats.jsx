import React from "react";
import { ToggleTheme } from "../context/UserContext";

const stats = [
  { value: "15+",     label: "Editing Tools",        sub: "Image & video" },
  { value: "12",      label: "Output Formats",        sub: "Images & video" },
  { value: "AI",      label: "Powered Features",      sub: "Cloudinary APIs" },
  { value: "∞",       label: "Cloud Processing",      sub: "No limits" },
];

const StatsSection = () => {
  const { darkMode } = ToggleTheme();

  return (
    <section
      className={`py-20 transition-colors duration-200 ${
        darkMode
          ? "bg-[#0B0D14] border-y border-gray-800"
          : "bg-slate-50 border-y border-gray-200"
      }`}
    >
      <div className="px-6 mx-auto max-w-7xl lg:px-8">

        {/* Label */}
        <p
          className={`text-center text-xs font-semibold tracking-[0.14em] uppercase mb-12 ${
            darkMode ? "text-gray-600" : "text-gray-400"
          }`}
        >
          By the numbers
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center px-6 py-4 ${
                i < stats.length - 1
                  ? `border-r ${darkMode ? "border-gray-800" : "border-gray-200"}`
                  : ""
              } ${
                i >= 2 && i < stats.length
                  ? `mt-10 lg:mt-0 ${i === 2 ? `border-t lg:border-t-0 ${darkMode ? "border-gray-800" : "border-gray-200"}` : ""}`
                  : ""
              }`}
            >
              <span
                className={`font-display text-5xl lg:text-6xl font-bold tracking-tight ${
                  darkMode ? "text-white" : "text-gray-950"
                }`}
              >
                {item.value}
              </span>
              <span
                className={`mt-2 text-sm font-semibold ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {item.label}
              </span>
              <span
                className={`mt-0.5 text-xs ${
                  darkMode ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {item.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;