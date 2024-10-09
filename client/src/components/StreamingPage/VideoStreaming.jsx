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
        const response = await fetch("http://localhost:8000/videos");
        const videos = await response.json();
        setUploadedVideos(videos);
      } catch (error){
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold">VideoStream</h1>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {videoUrl ? (
              <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
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
              <div className={`flex flex-col items-center justify-center h-96 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
                <VideoIcon className="w-16 h-16 text-blue-500 mb-4" />
                <h2 className="text-xl font-semibold mb-2">No Video Selected</h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Upload a video or select one from the gallery to start watching
                </p>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <UploadForm onUploadSuccess={(url) => setVideoUrl(url)} />
          </div>
        </div>

        <VideoGallery
          videos={uploadedVideos}
          onVideoSelect={(url) => setVideoUrl(url)}
        />
      </div>
    </div>
  );
};

export default VideoStreaming;