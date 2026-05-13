import { ToggleTheme } from "../../../context/UserContext";

const FeatureCard = ({ icon: Icon, title, description, onClick, category }) => {
    const { darkMode } = ToggleTheme();
    
    const getCategoryColor = () => {
        switch (category) {
        case 'image':
            return darkMode ? "text-blue-400" : "text-blue-600";
        case 'video':
            return darkMode ? "text-red-400" : "text-red-600";
        case 'conversion':
            return darkMode ? "text-green-400" : "text-green-600";
        case 'enhancement':
            return darkMode ? "text-purple-400" : "text-purple-600";
        default:
            return darkMode ? "text-violet-400" : "text-violet-600";
        }
    };

    return (
        <div
        className={`cursor-pointer rounded-3xl border p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl ${
            darkMode ? "border-gray-800 bg-[#111520]/80 hover:border-blue-500/30" : "border-gray-200 bg-white hover:border-blue-200"
        }`}
        onClick={onClick}
        >
        <div className="mb-4">
            <Icon className={`w-12 h-12 ${getCategoryColor()}`} />
        </div>
        <h3 className="mb-2 text-xl font-semibold tracking-tight">{title}</h3>
        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {description}
        </p>
        {category && (
            <span className={`inline-block mt-3 rounded-full px-2 py-1 text-xs font-semibold ${
            darkMode ? "bg-white/5 text-gray-300" : "bg-slate-100 text-slate-600"
            }`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
        )}
        </div>
    );
};

export default FeatureCard;
