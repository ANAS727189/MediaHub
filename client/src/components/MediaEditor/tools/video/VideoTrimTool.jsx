import { useState, useEffect, useRef } from 'react';
import { ToggleTheme } from '../../../../context/UserContext';
import MediaUploader from '../../core/MediaUploader';
import { Download, Play, Pause, SkipBack, SkipForward } from 'lucide-react';

const VideoTrimTool = ({ 
    mediaUrl, 
    uploadedFile, 
    uploading, 
    onFileUpload, 
    transformedUrl, 
    setTransformedUrl,
    onDownload,
    generateTransformUrl 
}) => {
    const { darkMode } = ToggleTheme();
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [trimSettings, setTrimSettings] = useState({
    startTime: 0,
    endTime: 30,
    startTimeFormatted: "00:00",
    endTimeFormatted: "00:30"
    });

    useEffect(() => {
        if (mediaUrl && trimSettings.startTime !== undefined && trimSettings.endTime !== undefined) {
        const transformations = [
            "f_auto",
            `so_${trimSettings.startTime}`,
            `eo_${trimSettings.endTime}`
        ];
        const url = generateTransformUrl(mediaUrl, transformations);
        setTransformedUrl(url);
        }
    }, [mediaUrl, trimSettings, generateTransformUrl, setTransformedUrl]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleVideoLoad = () => {
        if (videoRef.current) {
        const videoDuration = videoRef.current.duration;
        setDuration(videoDuration);
        setTrimSettings(prev => ({
            ...prev,
            endTime: Math.min(prev.endTime, videoDuration),
            endTimeFormatted: formatTime(Math.min(prev.endTime, videoDuration))
        }));
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
        }
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
        }
    };

    const seekTo = (time) => {
        if (videoRef.current) {
        videoRef.current.currentTime = time;
        setCurrentTime(time);
        }
    };

    const handleStartTimeChange = (value) => {
        const startTime = parseFloat(value);
        setTrimSettings(prev => ({
        ...prev,
        startTime: Math.min(startTime, prev.endTime - 1),
        startTimeFormatted: formatTime(Math.min(startTime, prev.endTime - 1))
        }));
    };

    const handleEndTimeChange = (value) => {
        const endTime = parseFloat(value);
        setTrimSettings(prev => ({
        ...prev,
        endTime: Math.max(endTime, prev.startTime + 1),
        endTimeFormatted: formatTime(Math.max(endTime, prev.startTime + 1))
        }));
    };

    const setCurrentAsStart = () => {
        handleStartTimeChange(currentTime);
    };

    const setCurrentAsEnd = () => {
        handleEndTimeChange(currentTime);
    };

    const renderControls = () => (
        <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <div className="mb-6">
            <h3 className="mb-4 text-lg font-semibold">Video Trim Settings</h3>
            
            {/* Video Info */}
            {duration > 0 && (
            <div className="p-3 mb-4 bg-gray-100 rounded dark:bg-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                <div>Total Duration: {formatTime(duration)}</div>
                <div>Current Time: {formatTime(currentTime)}</div>
                <div>Trim Duration: {formatTime(trimSettings.endTime - trimSettings.startTime)}</div>
                </div>
            </div>
            )}

            {/* Start Time Control */}
            <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Start Time</label>
                <button
                onClick={setCurrentAsStart}
                className="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                Use Current Time
                </button>
            </div>
            <input
                type="range"
                min="0"
                max={duration}
                step="0.1"
                value={trimSettings.startTime}
                onChange={(e) => handleStartTimeChange(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="mt-1 text-xs text-gray-500">{trimSettings.startTimeFormatted}</div>
            </div>

            {/* End Time Control */}
            <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">End Time</label>
                <button
                onClick={setCurrentAsEnd}
                className="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                Use Current Time
                </button>
            </div>
            <input
                type="range"
                min="0"
                max={duration}
                step="0.1"
                value={trimSettings.endTime}
                onChange={(e) => handleEndTimeChange(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="mt-1 text-xs text-gray-500">{trimSettings.endTimeFormatted}</div>
            </div>

            {/* Video Controls */}
            <div className="flex justify-center mb-4 space-x-2">
            <button
                onClick={() => seekTo(Math.max(0, currentTime - 10))}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            >
                <SkipBack className="w-4 h-4" />
            </button>
            <button
                onClick={togglePlayPause}
                className="p-2 text-white rounded bg-violet-600 hover:bg-violet-700"
            >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
                onClick={() => seekTo(Math.min(duration, currentTime + 10))}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            >
                <SkipForward className="w-4 h-4" />
            </button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 mb-4">
            <button
                onClick={() => seekTo(trimSettings.startTime)}
                className="px-3 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600"
            >
                Go to Start
            </button>
            <button
                onClick={() => seekTo(trimSettings.endTime)}
                className="px-3 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
            >
                Go to End
            </button>
            </div>
        </div>

        {transformedUrl && (
            <button
            onClick={() => onDownload(transformedUrl, "trimmed_video")}
            className="inline-flex items-center justify-center w-full px-4 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
            >
            <Download className="w-4 h-4 mr-2" /> Download Trimmed Video
            </button>
        )}
        </div>
    );

    const renderPreview = () => (
        <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        {!mediaUrl ? (
            <MediaUploader
            uploading={uploading}
            onFileUpload={onFileUpload}
            accept="video/*"
            supportedFormats="Videos (MP4, WebM, AVI, MOV)"
            />
        ) : (
            <div className="relative">
            <video
                ref={videoRef}
                src={mediaUrl}
                controls
                className="w-full rounded-lg"
                style={{ maxHeight: '400px' }}
                onLoadedMetadata={handleVideoLoad}
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
            
            {/* Trim Indicators */}
            {duration > 0 && (
                <div className="mt-4">
                <div className="relative w-full h-4 bg-gray-200 rounded">
                    {/* Start indicator */}
                    <div
                    className="absolute top-0 bottom-0 w-1 bg-green-500"
                    style={{ left: `${(trimSettings.startTime / duration) * 100}%` }}
                    />
                    {/* End indicator */}
                    <div
                    className="absolute top-0 bottom-0 w-1 bg-red-500"
                    style={{ left: `${(trimSettings.endTime / duration) * 100}%` }}
                    />
                    {/* Selected region */}
                    <div
                    className="absolute top-0 bottom-0 bg-blue-300 opacity-50"
                    style={{
                        left: `${(trimSettings.startTime / duration) * 100}%`,
                        width: `${((trimSettings.endTime - trimSettings.startTime) / duration) * 100}%`
                    }}
                    />
                    {/* Current time indicator */}
                    <div
                    className="absolute top-0 bottom-0 w-0.5 bg-black"
                    style={{ left: `${(currentTime / duration) * 100}%` }}
                    />
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>Start: {formatTime(trimSettings.startTime)}</span>
                    <span>Current: {formatTime(currentTime)}</span>
                    <span>End: {formatTime(trimSettings.endTime)}</span>
                </div>
                </div>
            )}
            </div>
        )}
        </div>
    );

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {renderPreview()}
        {mediaUrl && renderControls()}
        </div>
    );
};

export default VideoTrimTool;
