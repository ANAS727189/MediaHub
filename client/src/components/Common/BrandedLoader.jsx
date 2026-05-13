import { ToggleTheme } from "../../context/UserContext";

const BrandedLoader = ({ message = "Preparing your workspace" }) => {
  const { darkMode } = ToggleTheme();

  return (
    <div
      className={`relative flex min-h-[60vh] items-center justify-center overflow-hidden rounded-xl border ${
        darkMode
          ? "bg-gray-900 border-gray-800"
          : "bg-gradient-to-b from-white to-sky-50 border-gray-200"
      }`}
    >
      <div className="absolute h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute h-56 w-56 rounded-full border border-cyan-400/40 loader-orbit" />
      <div className="absolute h-72 w-72 rounded-full border border-blue-400/20 loader-orbit-reverse" />

      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-cyan-400/40 blur-xl animate-pulse" />
            <lord-icon
              src="https://cdn.lordicon.com/ugllxeyl.json"
              trigger="loop"
              stroke="bold"
              colors="primary:#107c91,secondary:#66a1ee"
              style={{ width: 56, height: 56 }}
            ></lord-icon>
          </div>
          <h2 className={`text-2xl font-extrabold tracking-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
            MediaHub
          </h2>
        </div>

        <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>{message}</p>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-500 loader-dot-1" />
          <span className="h-2 w-2 rounded-full bg-blue-500 loader-dot-2" />
          <span className="h-2 w-2 rounded-full bg-indigo-500 loader-dot-3" />
        </div>
      </div>
    </div>
  );
};

export default BrandedLoader;