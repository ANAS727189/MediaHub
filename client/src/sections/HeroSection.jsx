import { useNavigate } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";
import { ToggleTheme } from "../context/UserContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { darkMode } = ToggleTheme();

  return (
    <section
      className={`relative min-h-screen overflow-hidden ${
        darkMode ? "bg-[#0B0D14]" : "bg-white"
      }`}
    >
      {/* ── Atmospheric glow blobs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-24 -right-24 w-[640px] h-[640px] rounded-full blur-[140px] ${
            darkMode ? "bg-blue-600/10" : "bg-blue-400/12"
          }`}
        />
        <div
          className={`absolute -bottom-20 -left-10 w-[480px] h-[480px] rounded-full blur-[120px] ${
            darkMode ? "bg-indigo-800/8" : "bg-indigo-300/10"
          }`}
        />
      </div>

      {/* ── Dot grid texture ── */}
      <div
        className={`absolute inset-0 pointer-events-none dot-grid ${
          darkMode ? "text-gray-600/20" : "text-gray-400/30"
        }`}
      />

      <div className="relative px-6 mx-auto py-14 max-w-7xl lg:px-8 lg:py-16">
        <div className="grid items-center gap-16 lg:grid-cols-2 xl:gap-24">

          {/* ── Left: Content ── */}
          <div>
            {/* Label badge */}
            {/* <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 mb-8 text-xs font-semibold tracking-[0.12em] uppercase rounded-full border ${
                darkMode
                  ? "border-blue-500/25 text-blue-400 bg-blue-500/[0.08]"
                  : "border-blue-200 text-blue-600 bg-blue-50"
              }`}
            >
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              Professional Media Platform
            </div> */}

            <h1
              className={`font-display text-5xl lg:text-6xl xl:text-[68px] font-bold tracking-tight leading-[1.06] ${
                darkMode ? "text-white" : "text-gray-950"
              }`}
            >
              Transform Your
              <br />
              <span className="text-blue-500">Media.</span>{" "}
              <span className={darkMode ? "text-gray-500" : "text-gray-400"}>
                Precisely.
              </span>
            </h1>

            <p
              className={`mt-6 text-[17px] leading-relaxed max-w-[420px] ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Edit, convert, and stream video/image content powered by
              cloud infrastructure, built for creators who care about quality.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-10">
              <button
                onClick={() => navigate("/media")}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all  bg-blue-700 rounded-lg hover:bg-blue-600  active:scale-[0.98]"
              >
                <span>Start Editing</span>
                <lord-icon
                  src="https://cdn.lordicon.com/wsaaegar.json"
                  trigger="hover"
                  stroke="bold"
              colors="primary:#30e849,secondary:#16c72e"
                  style={{ width: 35, height: 35 }}
                />
              </button>
              <button
                onClick={() => navigate("/video-streaming")}
                className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 border ${
                  darkMode
                    ? "border-gray-700 text-gray-300 hover:border-gray-500 hover:bg-white/[0.04]"
                    : "border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                Try Streaming
              </button>
            </div>

            {/* Capability pills */}
            <div className="flex flex-wrap gap-2 mt-8">
              {["HLS Streaming", "FFmpeg Processing", "15+ Editing Tools", "Cloud Storage"].map((tag) => (
                <span
                  key={tag}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                    darkMode
                      ? "bg-gray-800 text-gray-500 border border-gray-700/60"
                      : "bg-gray-100 text-gray-500 border border-gray-200"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: Video preview ── */}
          <div className="relative mt-4 lg:mt-0">

            {/* ── Floating format badge (top-right) ── */}
            <div
              className={`absolute -top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-2 rounded-lg border shadow-lg text-xs font-mono ${
                darkMode
                  ? "bg-[#12151F] border-gray-800 text-gray-400"
                  : "bg-white border-gray-200 text-gray-500 shadow-gray-100"
              }`}
            >
              <span className="font-bold text-green-500">✓</span>
              <span>MP4 · WebM · MOV · HLS</span>
            </div>

            {/* ── Main video card ── */}
            <div
              className={`relative rounded-2xl overflow-hidden border ${
                darkMode
                  ? "border-gray-800 shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
                  : "border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              }`}
            >
              {/* Fake OS chrome */}
              <div
                className={`flex items-center gap-2 px-4 h-9 border-b ${
                  darkMode
                    ? "bg-[#12151F] border-gray-800"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                <span
                  className={`ml-3 text-xs font-mono tracking-tight ${
                    darkMode ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  preview.mp4 ~ MediaHub Studio
                </span>
              </div>

              <video
                src="/dummy.mp4"
                className="block object-cover w-full aspect-video"
                autoPlay
                muted
                loop
              />

              {/* Play button overlay */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center top-9">
                <button className="flex items-center justify-center transition-all duration-200 border rounded-full w-14 h-14 backdrop-blur-md bg-black/25 border-white/20 hover:bg-black/35 hover:scale-105 group">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </button>
              </div>
            </div>

            {/* ── Floating HLS badge (bottom-left) ── */}
            <div
              className={`absolute -bottom-5 -left-5 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl z-10 ${
                darkMode
                  ? "bg-[#12151F] border-gray-800"
                  : "bg-white border-gray-200 shadow-gray-100/80"
              }`}
            >
              <div className="flex items-center justify-center flex-shrink-0 rounded-lg w-9 h-9 bg-blue-500/15">
                <Play className="w-4 h-4 text-blue-400 fill-blue-400 ml-0.5" />
              </div>
              <div>
                <p
                  className={`text-xs font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  HLS Adaptive Streaming
                </p>
                <p
                  className={`text-xs mt-0.5 ${
                    darkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Multi-bitrate · Low latency
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;