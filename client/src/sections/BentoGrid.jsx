import React from "react";
import { ToggleTheme } from "../context/UserContext";
import {
  MonitorPlay, Palette, Play, Zap, BarChart3, Cloud, ArrowRight,
} from "lucide-react";

const features = [
  {
    title: "Media Transformation",
    description:
      "Cloudinary-powered processing with AI upscaling, smart cropping, format conversion, and advanced image and video transformations at scale.",
    icon: MonitorPlay,
    accent: "from-violet-500 to-blue-500",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
    wide: true,
  },
  {
    title: "Image Editing Suite",
    description:
      "Complete toolkit — resize, crop, compress, rotate, and apply professional effects with precision and real-time preview.",
    icon: Palette,
    accent: "from-emerald-500 to-teal-500",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    wide: false,
  },
  {
    title: "Video Processing",
    description:
      "HLS streaming, trimming, audio controls, color grading, and real-time thumbnail generation via FFmpeg.",
    icon: Play,
    accent: "from-rose-500 to-pink-500",
    iconBg: "bg-rose-500/15",
    iconColor: "text-rose-400",
    wide: false,
  },
  {
    title: "Format Conversion",
    description:
      "Convert between JPG, PNG, WebP, AVIF, MP4, WebM, AVI, MOV — with customizable compression and quality settings.",
    icon: Zap,
    accent: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-400",
    wide: false,
  },
  {
    title: "Analytics & Insights",
    description:
      "Real-time view tracking, engagement metrics, and comprehensive upload analytics for your media library.",
    icon: BarChart3,
    accent: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    wide: true,
  },
  {
    title: "Cloud Infrastructure",
    description:
      "Global CDN delivery with enterprise-grade reliability, secure file handling, and seamless cloud processing.",
    icon: Cloud,
    accent: "from-indigo-500 to-purple-500",
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-400",
    wide: false,
  },
];

const FeatureCard = ({ feature, darkMode }) => {
  const Icon = feature.icon;

  return (
    <div
      className={`group relative flex flex-col p-6 lg:p-7 rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        feature.wide ? "md:col-span-2" : "col-span-1"
      } ${
        darkMode
          ? "bg-[#12151F] border-gray-800 hover:border-gray-700"
          : "bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Subtle gradient wash on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feature.accent} pointer-events-none`}
        style={{ opacity: 0 }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = "0.03"}
        onMouseLeave={(e) => e.currentTarget.style.opacity = "0"}
      />

      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${feature.iconBg} flex-shrink-0`}>
        <Icon className={`w-5 h-5 ${feature.iconColor}`} />
      </div>

      {/* Text */}
      <h3
        className={`font-display mt-4 text-lg font-bold leading-snug ${
          darkMode ? "text-white" : "text-gray-950"
        }`}
      >
        {feature.title}
      </h3>

      <p
        className={`mt-2 text-sm leading-relaxed flex-grow ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {feature.description}
      </p>

      {/* Footer link */}
      <div
        className={`mt-5 inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200 ${
          darkMode
            ? "text-gray-600 group-hover:text-blue-400"
            : "text-gray-400 group-hover:text-blue-600"
        }`}
      >
        Learn more
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      </div>
    </div>
  );
};

const BentoGridSection = () => {
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
            Powerful Tools
          </p>
          <h2
            className={`font-display mt-3 text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight ${
              darkMode ? "text-white" : "text-gray-950"
            }`}
          >
            Everything You Need for{" "}
            <span className="text-blue-500">Media Processing</span>
          </h2>
          <p
            className={`mt-4 max-w-2xl mx-auto text-base lg:text-lg ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            From simple edits to complex transformations — our suite handles
            all your media processing needs in one platform.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} darkMode={darkMode} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGridSection;