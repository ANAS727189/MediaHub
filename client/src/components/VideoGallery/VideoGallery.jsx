import { VideoCard } from './VideoCard';
import { Film, Headset } from 'lucide-react';
import { ToggleTheme } from "../../context/UserContext";
import recommendedVideos from '../../assets/data/recommendedVideos';

export const VideoGallery = ({ videos, onVideoSelect }) => {
  const { darkMode } = ToggleTheme();

  const handleVideoSelect = (video) => {
    const videoUrl = `${import.meta.env.VITE_BACKEND_URI}${video.videoPath}`;
    console.log("Selecting video:", video.title);
    console.log("Video path from DB:", video.videoPath);
    console.log("Backend URI:", import.meta.env.VITE_BACKEND_URI);
    console.log("Full video URL:", videoUrl);
    
    // Test if the file exists before selecting
    fetch(videoUrl, { method: 'HEAD' })
      .then(response => {
        console.log("Video file check response:", response.status);
        if (response.ok) {
          onVideoSelect(videoUrl);
        } else {
          console.error("Video file not accessible:", response.status, response.statusText);
          alert(`Video file not found: ${response.status} ${response.statusText}`);
        }
      })
      .catch(error => {
        console.error("Error checking video file:", error);
        // Try to select anyway in case it's a CORS issue
        onVideoSelect(videoUrl);
      });
  };

  return (
    <div className="mt-12">
      {/* Section: Uploaded Videos */}
      <div className="flex items-center mb-6 space-x-2">
        <Film className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-semibold">Your Uploaded Videos</h2>
      </div>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard
              key={video._id}
              thumbnail={`${import.meta.env.VITE_BACKEND_URI}${video.thumbnailPath}`}
              title={video.title}
              views={video.views || "1.1m"}
              duration={video.duration || "3:00"}
              onClick={() => handleVideoSelect(video)}
            />
          ))}
        </div>
      ) : (
        <div
          className={`flex flex-col items-center justify-center p-12 rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}
        >
          <Film className="w-12 h-12 mb-4 text-gray-400" />
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            No videos uploaded yet
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Upload your first video to get started!
          </p>
        </div>
      )}

      {/* Section: Recommended Videos */}
      <div className="mt-8">
        <div className="flex items-center mb-6 space-x-2">
          <Headset className="w-8 h-8 text-blue-500" />
          <h2 className="text-2xl font-semibold">Recommended Videos</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommendedVideos.map((item) => (
            <VideoCard
              key={item._id || item.url} 
              thumbnail={item.thumbnail}
              title={item.title}
              views={item.views}
              url={item.url}
              duration={item.duration}
              onClick={() => onVideoSelect(item.url)}
            />
          ))}
        </div>

        <p className="p-3 mt-6 text-xl">More videos coming soon...</p>
      </div>
    </div>
  );
};

export default VideoGallery;