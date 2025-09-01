import { ToggleTheme } from "../../../context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditorLayout = ({ children, title = "Professional Media Editor", showBackButton = false, onBack }) => {
    const { darkMode } = ToggleTheme();

    return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
        <ToastContainer theme={darkMode ? "dark" : "light"} />
        <div className="container p-6 mx-auto">
            <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">{title}</h1>
            {showBackButton && (
                <button
                onClick={onBack}
                className="px-4 py-2 text-white transition-colors rounded-lg bg-violet-600 hover:bg-violet-700"
                >
                Back to Features
                </button>
            )}
            </div>
            {children}
        </div>
        </div>
    );
};

export default EditorLayout;
