import { useNavigate } from "react-router-dom";
import { Play} from "lucide-react";
import { ToggleTheme } from "../context/UserContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { darkMode } = ToggleTheme();


  return (
    <div
      className={`min-h-screen relative overflow-hidden ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-200`}
    >
      {/* Gradient overlay */}
      <div
        className={`absolute ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 to-blue-900 opacity-50"
            : "bg-gradient-to-br from-blue-100 to-blue-200 opacity-75"
        }`}
      />

            <div className="relative px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-12 lg:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left column - Main content */}
          <div className="text-center lg:text-left">
            <p
              className={`text-sm sm:text-base font-semibold uppercase tracking-wide ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Welcome to MediaHub
            </p>
            <h1
              className={`mt-2 text-3xl sm:text-6xl lg:text-7xl xl:text-10xl font-extrabold ${
                darkMode ? "text-white" : "text-gray-900"
              } tracking-tight leading-tight`}
            >
              Professional Media
              <span
                className={`block ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Processing Platform
              </span>
            </h1>
            <p
              className={`mt-4 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 ${
                darkMode ? "text-gray-300" : "text-gray-500"
              }`}
            >
              Transform, edit, and optimize your images and videos with our powerful suite of 
              AI-powered tools. From format conversion to advanced editing, all in one platform.
            </p>
            <div className="flex flex-col justify-center mt-8 space-y-3 sm:flex-row lg:justify-start sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => navigate("/media")}
                className={`inline-flex items-center justify-center px-6 py-3 sm:px-8 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-sm ${
                  darkMode
                    ? "text-gray-900 bg-white hover:bg-gray-100"
                    : "text-white bg-blue-600 hover:bg-blue-700"
                } transition duration-150`}
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
                className={`inline-flex items-center justify-center px-6 py-3 sm:px-8 border text-sm sm:text-base font-medium rounded-md shadow-sm ${
                  darkMode
                    ? "border-gray-300 text-white bg-transparent hover:bg-gray-700"
                    : "border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50"
                } transition duration-150`}
              >
                Try Streaming
              </button>
            </div>
          </div>

          {/* Right column - Video preview */}
          <div className="relative mt-8 lg:ml-10 lg:mt-0">
            <div
              className={`aspect-w-16 aspect-h-9 rounded-xl lg:rounded-2xl overflow-hidden ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg lg:shadow-xl`}
            >
              <video
                src="/dummy.mp4"
                className="object-cover w-full h-full"
                autoPlay
                muted
                loop
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-30">
                <button className="flex items-center justify-center w-16 h-16 transition-all duration-300 transform bg-white rounded-full lg:w-20 lg:h-20 bg-opacity-30 hover:bg-opacity-40 hover:scale-110">
                  <Play className="w-8 h-8 text-white lg:w-10 lg:h-10" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
