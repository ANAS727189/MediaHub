import { useEffect, useState } from 'react';
import { VideoCard } from './VideoCard';
import { Film, Headset } from 'lucide-react';
import { ToggleTheme } from "../../context/UserContext";
import recommendedVideos from '../../assets/data/recommendedVideos';
import { checkVideoFileExists, formatVideoErrorMessage } from '../../utils/videoIntegrity';
import AppDialog from '../Common/AppDialog';

// Helper function to format seconds to MM:SS
const formatDuration = (seconds) => {
  if (!seconds || seconds === 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

// Helper function to format view count (without "views" suffix)
const formatViews = (views) => {
  if (!views) return "0";
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return `${views}`;
};

export const VideoGallery = ({ videos, onVideoSelect, onVideoDelete }) => {
  const { darkMode, userId } = ToggleTheme();
  const [deleteFeedback, setDeleteFeedback] = useState(null);
  const [dialogConfig, setDialogConfig] = useState({
    open: false,
    title: '',
    message: '',
    variant: 'info',
    primaryText: 'OK',
    secondaryText: undefined,
    onPrimary: null,
    onSecondary: null,
  });

  // Filter videos to show only user's uploaded videos
  const userVideos = videos.filter(video => video.uploaderId === userId);

  const handleVideoSelect = async (video) => {
    const videoUrl = `${import.meta.env.VITE_BACKEND_URI}${video.videoPath}`;
    console.log("Selecting video:", video.title);
    console.log("Video path from DB:", video.videoPath);
    console.log("Backend URI:", import.meta.env.VITE_BACKEND_URI);
    console.log("Full video URL:", videoUrl);
    
    // Check if the video file exists
    const checkResult = await checkVideoFileExists(videoUrl);
    console.log("Video file check result:", checkResult);
    
    if (checkResult.exists) {
      console.log("✅ Video file accessible, loading...");
      onVideoSelect(videoUrl);
    } else {
      console.error("❌ Video file not accessible:", checkResult);
      
      if (checkResult.error) {
        // Network error case
        const errorMessage = formatVideoErrorMessage(video, checkResult);
        setDialogConfig({
          open: true,
          title: 'Network issue while loading video',
          message: errorMessage,
          variant: 'warning',
          primaryText: 'Try Anyway',
          secondaryText: 'Cancel',
          onPrimary: () => {
            setDialogConfig((prev) => ({ ...prev, open: false }));
            onVideoSelect(videoUrl);
          },
          onSecondary: () => setDialogConfig((prev) => ({ ...prev, open: false })),
        });
      } else {
        // File not found case
        const errorMessage = formatVideoErrorMessage(video, checkResult);
        setDialogConfig({
          open: true,
          title: 'Video file not available',
          message: errorMessage,
          variant: 'error',
          primaryText: 'OK',
          secondaryText: undefined,
          onPrimary: () => setDialogConfig((prev) => ({ ...prev, open: false })),
          onSecondary: null,
        });
      }
    }
  };

  const handleDelete = async (videoId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/videos/${videoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uploaderId: userId }),
      });

      if (response.ok) {
        setDeleteFeedback({ type: 'success', message: 'Video deleted successfully.' });
        if (onVideoDelete) {
          onVideoDelete(videoId);
        }
      } else {
        const error = await response.json();
        setDeleteFeedback({ type: 'error', message: error.message || 'Failed to delete video.' });
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      setDeleteFeedback({ type: 'error', message: 'Error deleting video.' });
    }
  };

  useEffect(() => {
    if (!deleteFeedback) return;
    const timeout = setTimeout(() => setDeleteFeedback(null), 2500);
    return () => clearTimeout(timeout);
  }, [deleteFeedback]);

  return (
    <div className="mt-2">
      <AppDialog
        open={dialogConfig.open}
        darkMode={darkMode}
        title={dialogConfig.title}
        message={dialogConfig.message}
        variant={dialogConfig.variant}
        primaryText={dialogConfig.primaryText}
        secondaryText={dialogConfig.secondaryText}
        onPrimary={dialogConfig.onPrimary || (() => {})}
        onSecondary={dialogConfig.onSecondary || (() => {})}
      />

      {/* Section: Uploaded Videos */}
      <div className="flex items-center mb-6 space-x-2">
        <div className={`rounded-2xl p-2 ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
          <Film className="w-6 h-6 text-blue-500" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">Your Uploaded Videos</h2>
      </div>

      {deleteFeedback && (
        <div
          className={`mb-4 rounded-2xl border px-3 py-2 text-sm ${
            deleteFeedback.type === 'success'
              ? darkMode
                ? 'bg-green-950 border-green-800 text-green-200'
                : 'bg-green-50 border-green-200 text-green-700'
              : darkMode
                ? 'bg-red-950 border-red-800 text-red-200'
                : 'bg-red-50 border-red-200 text-red-700'
          }`}
        >
          {deleteFeedback.message}
        </div>
      )}

      {userVideos.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {userVideos.map((video) => (
            <VideoCard
              key={video._id}
              videoId={video._id}
              thumbnail={`${import.meta.env.VITE_BACKEND_URI}${video.thumbnailPath}`}
              title={video.title}
              views={formatViews(video.views)}
              duration={formatDuration(video.duration)}
              onClick={() => handleVideoSelect(video)}
              onDelete={() => handleDelete(video._id)}
              isUserVideo={true}
            />
          ))}
        </div>
      ) : (
        <div
          className={`flex flex-col items-center justify-center rounded-3xl border p-12 ${
            darkMode ? 'border-gray-800 bg-white/[0.03]' : 'border-gray-200 bg-slate-50'
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
          <div className={`rounded-2xl p-2 ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
            <Headset className="text-blue-500 h-7 w-7" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">Recommended Videos</h2>
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
              isUserVideo={false}
            />
          ))}
        </div>

        <p className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${darkMode ? 'border-gray-800 bg-white/[0.03] text-gray-400' : 'border-gray-200 bg-white text-gray-500'}`}>More videos coming soon...</p>
      </div>
    </div>
  );
};

export default VideoGallery;