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
      className={`relative cursor-pointer overflow-hidden rounded-3xl border shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        darkMode ? 'border-gray-800 bg-[#111520]' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="relative aspect-video">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-3 right-3 flex items-center rounded-full bg-black/75 px-2.5 py-1 text-sm text-white backdrop-blur-sm">
          <Clock className="w-4 h-4 mr-1" />
          {duration}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 hover:opacity-100">
          <div className="transform transition-transform duration-300 hover:scale-110">
            <Play className="w-16 h-16 text-white" fill="white" />
          </div>
        </div>
        {isUserVideo && (
          <>
            <button
              onClick={handleDelete}
              className="absolute right-3 top-3 rounded-full bg-red-500 p-2 text-white transition-colors duration-200 hover:bg-red-600"
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
        <h3 className="mb-2 line-clamp-2 text-lg font-bold tracking-tight">{title}</h3>
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