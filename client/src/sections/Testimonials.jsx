import React from "react";
import { ToggleTheme } from "../context/UserContext";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Digital Content Creator",
    handle: "@AlexCreates",
    initials: "AT",
    quote:
      "MediaHub's image editing tools are incredibly powerful. The AI upscaling and format conversion features have genuinely streamlined my workflow. Perfect for serious content creators.",
    rating: 5,
  },
  {
    name: "Maria Rodriguez",
    role: "Web Developer",
    handle: "DevStudio Pro",
    initials: "MR",
    quote:
      "The video processing capabilities are impressive. HLS streaming works flawlessly and batch processing saves me hours every week. The Cloudinary integration is a real game-changer.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Photographer",
    handle: "Wilson Photography",
    initials: "JW",
    quote:
      "Finally, a platform that handles both images and videos professionally. The compression algorithms are excellent — maintaining quality while cutting file sizes dramatically.",
    rating: 5,
  },
];

const Stars = ({ count, darkMode }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${
          i < count
            ? "text-amber-400 fill-amber-400"
            : darkMode
            ? "text-gray-700"
            : "text-gray-200"
        }`}
      />
    ))}
  </div>
);

const TestimonialsSection = () => {
  const { darkMode } = ToggleTheme();

  return (
    <section
      className={`py-24 lg:py-32 transition-colors duration-200 ${
        darkMode ? "bg-[#0B0D14]" : "bg-slate-50"
      }`}
    >
      <div className="px-6 mx-auto max-w-7xl lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14 lg:mb-16">
          <p
            className={`text-xs font-semibold tracking-[0.14em] uppercase ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Testimonials
          </p>
          <h2
            className={`font-display mt-3 text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight ${
              darkMode ? "text-white" : "text-gray-950"
            }`}
          >
            Loved by{" "}
            <span className="text-blue-500">Creators</span>
          </h2>
          <p
            className={`mt-4 max-w-xl mx-auto text-base lg:text-lg ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Developers, photographers, and creators trust MediaHub for their
            media processing needs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`group relative flex flex-col p-6 lg:p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                darkMode
                  ? "bg-[#12151F] border-gray-800 hover:border-gray-700"
                  : "bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
              }`}
            >
              {/* Stars */}
              <Stars count={t.rating} darkMode={darkMode} />

              {/* Quote */}
              <blockquote
                className={`mt-4 text-sm leading-relaxed flex-grow ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 mt-6 pt-5 border-t ${
                darkMode ? 'border-gray-800' : 'border-gray-100'
              }">
                {/* Avatar */}
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-full text-xs font-bold flex-shrink-0 ${
                    darkMode
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p
                    className={`text-sm font-semibold truncate ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {t.name}
                  </p>
                  <p
                    className={`text-xs truncate mt-0.5 ${
                      darkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {t.role} · {t.handle}
                  </p>
                </div>
                <span
                  className={`ml-auto flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                    darkMode
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "bg-green-50 text-green-700 border border-green-100"
                  }`}
                >
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;