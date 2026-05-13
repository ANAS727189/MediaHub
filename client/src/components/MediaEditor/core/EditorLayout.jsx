import { ToggleTheme } from "../../../context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditorLayout = ({ children, title = "Professional Media Editor", showBackButton = false, onBack }) => {
    const { darkMode } = ToggleTheme();

    return (
        <div className={`relative min-h-screen overflow-hidden ${darkMode ? "bg-[#0B0D14] text-white" : "bg-slate-50 text-slate-900"}`}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className={`absolute -top-24 right-0 h-72 w-72 rounded-full blur-3xl ${darkMode ? 'bg-blue-500/10' : 'bg-blue-300/20'}`} />
            <div className={`absolute bottom-0 left-0 h-80 w-80 rounded-full blur-3xl ${darkMode ? 'bg-indigo-500/10' : 'bg-indigo-200/30'}`} />
        </div>
        <ToastContainer theme={darkMode ? "dark" : "light"} />
        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            <div className={`mb-6 flex flex-col gap-4 rounded-[2rem] border p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center sm:justify-between ${darkMode ? "border-gray-800 bg-[#111520]/80" : "border-gray-200 bg-white/90"}`}>
            <div>
                <p className={`text-xs uppercase tracking-[0.3em] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Editor Studio</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
            </div>
            {showBackButton && (
                <button
                onClick={onBack}
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-blue-500"
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
