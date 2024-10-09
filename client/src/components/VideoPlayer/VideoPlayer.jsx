import React from 'react';
import { VideoJS } from './VideoJS';


export const VideoPlayer = ({ videoUrl }) => {
  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: videoUrl ? [{
      src: videoUrl,
      type: "video/mp4",
    }] : [],
  };

  return (
    <div>
      {videoUrl ? (
        <VideoJS options={videoPlayerOptions} />
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Welcome to VideoStream</h2>
          <p className="text-gray-600">Upload a video to get started!</p>
        </div>
      )}
    </div>
  );
};
