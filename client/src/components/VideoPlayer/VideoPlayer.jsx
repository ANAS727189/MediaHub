import React from 'react';
import { VideoJS } from './VideoJS';

export const VideoPlayer = ({ videoUrl }) => {
  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: videoUrl
      ? [
          {
            src: videoUrl,
            type: videoUrl.endsWith(".m3u8")
              ? "application/x-mpegURL"
              : "video/mp4",
          },
        ]
      : [],
  };

  return (
    <div>
      {videoUrl ? (
        <VideoJS options={videoPlayerOptions} />
      ) : (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Welcome to VideoStream</h2>
          <p className="text-gray-600">Upload a video to get started!</p>
        </div>
      )}
    </div>
  );
};