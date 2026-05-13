import { ToggleTheme } from "../../context/UserContext";

const BrandedLoader = ({ message = "Preparing your workspace" }) => {
  const { darkMode } = ToggleTheme();

  return (
    <div
      className={`relative flex min-h-[60vh] items-center justify-center overflow-hidden ${
        darkMode
          ? "bg-[#0B0D14]"
          : "bg-gradient-to-b from-white to-sky-50"
      }`}
    >
      {/* Subtle background glow */}
      <div className="absolute rounded-full h-96 w-96 bg-blue-500/8 blur-3xl animate-pulse" />
      <div className="absolute rounded-full h-80 w-80 bg-blue-400/5 blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`absolute inset-0 rounded-full blur-lg animate-pulse ${
              darkMode ? "bg-blue-500/40" : "bg-blue-400/30"
            }`} style={{ inset: -8 }} />
            <lord-icon
              src="https://cdn.lordicon.com/ugllxeyl.json"
              trigger="loop"
              stroke="bold"
              colors={`primary:${darkMode ? '#3B82F6' : '#0EA5E9'},secondary:${darkMode ? '#60A5FA' : '#06B6D4'}`}
              style={{ width: 56, height: 56 }}
            />
          </div>
          <h2
            className={`font-display text-2xl font-bold tracking-tight ${
              darkMode ? "text-white" : "text-gray-950"
            }`}
          >
            MediaHub
          </h2>
        </div>

        <p className={`text-sm max-w-xs font-medium ${darkMode ? "text-blue-400/80" : "text-blue-600/70"}`}>
          {message}
        </p>

        <div className="flex items-center gap-2 mt-1">
          <span className="w-2 h-2 rounded-full bg-cyan-500 loader-dot-1" />
          <span className="w-2 h-2 bg-blue-500 rounded-full loader-dot-2" />
          <span className="w-2 h-2 bg-indigo-500 rounded-full loader-dot-3" />
        </div>
      </div>
    </div>
  );
};

export default BrandedLoader;