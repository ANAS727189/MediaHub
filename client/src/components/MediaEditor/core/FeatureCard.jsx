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
        className={`p-6 rounded-lg ${
            darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
        } shadow-lg transition-all cursor-pointer hover:scale-105 hover:shadow-xl`}
        onClick={onClick}
        >
        <div className="mb-4">
            <Icon className={`w-12 h-12 ${getCategoryColor()}`} />
        </div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {description}
        </p>
        {category && (
            <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
            darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
            }`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
        )}
        </div>
    );
};

export default FeatureCard;
