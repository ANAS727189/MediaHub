import { Play, Clock } from 'lucide-react';
import { ToggleTheme } from "../../context/UserContext";


export const VideoCard = ({ thumbnail, title, views, duration, onClick }) => {
  const { darkMode } = ToggleTheme();
  
  return (
    <div 
      onClick={onClick}
      className={`rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div className="relative aspect-video">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {duration}
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
          <div className="transform transition-transform duration-300 hover:scale-110">
            <Play className="w-16 h-16 text-white" fill="white" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} flex items-center`}>
          <span className="flex items-center">
            {views} views
          </span>
        </p>
      </div>
    </div>
  );
};

export default VideoCard;