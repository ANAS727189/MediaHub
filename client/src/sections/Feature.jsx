import React from "react";
import { ToggleTheme } from "../context/UserContext";
import { Video, Shield, BarChart, Zap, Users, Settings } from "lucide-react";

const features = [
  {
    icon: Video,
    num: "01",
    title: "Advanced Video Processing",
    description:
      "Professional video editing with HLS streaming, precise trimming, speed control, audio manipulation, and real-time thumbnail generation powered by FFmpeg.",
  },
  {
    icon: Shield,
    num: "02",
    title: "Image Transformation Suite",
    description:
      "Complete image editing — resize, crop, compress, rotate, apply effects, add watermarks, and AI-powered upscaling for professional-grade output.",
  },
  {
    icon: BarChart,
    num: "03",
    title: "Format Conversion Hub",
    description:
      "Convert between any format: JPG to PNG, WebP optimization, video conversion, and image-to-PDF with optimized compression at every step.",
  },
  {
    icon: Zap,
    num: "04",
    title: "Cloud-Powered Processing",
    description:
      "Cloudinary APIs deliver lightning-fast media transformations with global CDN and enterprise-grade reliability — no waiting, no local bottlenecks.",
  },
  {
    icon: Users,
    num: "05",
    title: "Intuitive Interface",
    description:
      "Drag-and-drop workflow with real-time preview, batch processing, and smooth interactions designed for both beginners and professionals.",
  },
  {
    icon: Settings,
    num: "06",
    title: "Professional Toolset",
    description:
      "Batch processing, custom watermarks, quality optimization, secure file handling, and comprehensive export options for every use case.",
  },
];

const FeatureCard = ({ feature, darkMode }) => {
  const Icon = feature.icon;

  return (
    <div
      className={`group relative p-6 lg:p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
        darkMode
          ? "bg-[#12151F] border-gray-800 hover:border-gray-700"
          : "bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Number + icon row */}
      <div className="flex items-start justify-between mb-5">
        <div
          className={`flex items-center justify-center w-11 h-11 rounded-xl border ${
            darkMode
              ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
              : "bg-blue-50 border-blue-100 text-blue-600"
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <span
          className={`font-display text-2xl font-bold tabular-nums tracking-tight ${
            darkMode ? "text-gray-800" : "text-gray-200"
          }`}
        >
          {feature.num}
        </span>
      </div>

      <h3
        className={`font-display text-lg font-bold leading-snug ${
          darkMode ? "text-white" : "text-gray-950"
        }`}
      >
        {feature.title}
      </h3>

      <p
        className={`mt-3 text-sm leading-relaxed ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {feature.description}
      </p>

      {/* Hover accent line */}
      <div className="absolute inset-x-0 bottom-0 h-px transition-opacity duration-300 opacity-0 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent group-hover:opacity-100 rounded-b-2xl" />
    </div>
  );
};

const FeatureSection = () => {
  const { darkMode } = ToggleTheme();

  return (
    <section
      className={`py-24 lg:py-32 transition-colors duration-200 ${
        darkMode ? "bg-[#0D0F18]" : "bg-white"
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
            Features
          </p>
          <h2
            className={`font-display mt-3 text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight ${
              darkMode ? "text-white" : "text-gray-950"
            }`}
          >
            Why Choose{" "}
            <span className="text-blue-500">MediaHub?</span>
          </h2>
          <p
            className={`mt-4 max-w-2xl mx-auto text-base lg:text-lg ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Professional media processing tools powered by cutting-edge
            technology and cloud infrastructure.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} darkMode={darkMode} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;