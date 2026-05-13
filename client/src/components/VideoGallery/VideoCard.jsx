import { useState } from 'react';
import { Play, Clock, Trash2 } from 'lucide-react';
import { ToggleTheme } from "../../context/UserContext";
import ConfirmTooltip from '../Common/ConfirmTooltip';


export const VideoCard = ({ thumbnail, title, views, duration, onClick, onDelete, isUserVideo }) => {
  const { darkMode } = ToggleTheme();
  const [showDeleteTooltip, setShowDeleteTooltip] = useState(false);
  
  const handleDelete = (e) => {
    e.stopPropagation();
    setShowDeleteTooltip(true);
  };

  const handleCancelDelete = (e) => {
    if (e) e.stopPropagation();
    setShowDeleteTooltip(false);
  };

  const handleConfirmDelete = (e) => {
    e.stopPropagation();
    setShowDeleteTooltip(false);
    if (onDelete) onDelete();
  };
  
  return (
    <div 
      onClick={onClick}
      className={`rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 relative ${
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
        {isUserVideo && (
          <>
            <button
              onClick={handleDelete}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
              title="Delete video"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <ConfirmTooltip
              open={showDeleteTooltip}
              title="Delete this video?"
              message="This removes the video from your gallery and storage."
              confirmText="Delete"
              cancelText="Cancel"
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
              darkMode={darkMode}
            />
          </>
        )}
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