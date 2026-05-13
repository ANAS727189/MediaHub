import { useState, useEffect } from "react";
import { VideoJS } from "../VideoPlayer/VideoJS";
import VideoGallery from "../VideoGallery/VideoGallery";
import UploadForm from "../UploadForm/UploadForm";
import { ToggleTheme } from "../../context/UserContext";
import { Film, Upload, VideoIcon } from "lucide-react";


const VideoStreaming = () => {
  const { darkMode } = ToggleTheme();
  const [videoUrl, setVideoUrl] = useState(null);
  const [uploadedVideos, setUploadedVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/videos`);
        const videos = await response.json();
        setUploadedVideos(videos);
      } catch (error){
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  const handleUploadSuccess = (newVideo) => {
    // Add the new video to the gallery
    setUploadedVideos(prev => [newVideo, ...prev]);
    
    // Play the new video immediately
    const videoPath = `${import.meta.env.VITE_BACKEND_URI}${newVideo.videoPath}`;
    setVideoUrl(videoPath);
  };

  const handleVideoDelete = (videoId) => {
    // Remove the deleted video from the gallery
    setUploadedVideos(prev => prev.filter(video => video._id !== videoId));
  };

  return (
    <div className={`relative min-h-screen overflow-hidden ${darkMode ? 'bg-[#0B0D14] text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={`absolute -top-20 right-0 h-72 w-72 rounded-full blur-3xl ${darkMode ? 'bg-blue-500/10' : 'bg-blue-300/20'}`} />
        <div className={`absolute bottom-0 left-0 h-80 w-80 rounded-full blur-3xl ${darkMode ? 'bg-indigo-500/10' : 'bg-indigo-200/30'}`} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <header className={`mb-8 rounded-[2rem] border p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] ${darkMode ? 'border-gray-800 bg-[#111520]/80' : 'border-gray-200 bg-white/90'}`}>
          <div className="flex items-center gap-3">
            <div className={`rounded-2xl p-3 ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
              <Film className="h-7 w-7 text-blue-500" />
            </div>
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Streaming Studio</p>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">VideoStream</h1>
            </div>
          </div>
          <p className={`mt-4 max-w-2xl text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Upload, preview, and manage HLS-ready videos in a focused studio layout that stays readable in both themes.
          </p>
        </header>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {videoUrl ? (
              <div className={`overflow-hidden rounded-3xl border shadow-[0_24px_80px_rgba(15,23,42,0.12)] ${darkMode ? 'border-gray-800 bg-[#111520]' : 'border-gray-200 bg-white'}`}>
                <VideoJS
                  options={{
                    controls: true,
                    responsive: true,
                    fluid: true,
                    sources: [{ 
                      src: videoUrl, 
                      type: videoUrl.endsWith(".m3u8") ? "application/x-mpegURL" : "video/mp4", 
                    }],
                  }}
                />
              </div>
            ) : (
              <div className={`flex h-96 flex-col items-center justify-center rounded-3xl border shadow-[0_24px_80px_rgba(15,23,42,0.08)] ${darkMode ? 'border-gray-800 bg-[#111520]' : 'border-gray-200 bg-white'}`}>
                <div className={`mb-4 rounded-2xl p-4 ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                  <VideoIcon className="h-14 w-14 text-blue-500" />
                </div>
                <h2 className="mb-2 text-xl font-semibold tracking-tight">No Video Selected</h2>
                <p className={`max-w-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Upload a video or select one from the gallery to start watching
                </p>
              </div>
            )}
          </div>
        
          <div className="lg:col-span-1">
            <UploadForm onUploadSuccess={handleUploadSuccess} />
          </div>
        </div>

        <div className={`mt-8 rounded-[2rem] border p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] ${darkMode ? 'border-gray-800 bg-[#111520]/80' : 'border-gray-200 bg-white/90'}`}>
          <VideoGallery
            videos={uploadedVideos}
            onVideoSelect={(url) => setVideoUrl(url)}
            onVideoDelete={handleVideoDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoStreaming;