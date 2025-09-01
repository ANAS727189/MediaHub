import { useState, useEffect } from 'react';
import { ToggleTheme } from '../../../../context/UserContext';
import MediaUploader from '../../core/MediaUploader';
import { Download, Volume2, VolumeX, Headphones } from 'lucide-react';

const VideoAudioTool = ({ 
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
    const [audioSettings, setAudioSettings] = useState({
        volume: 100,
        mute: false,
        extractAudio: false,
        audioFormat: 'mp3',
        audioBitrate: 128,
        audioOnly: false
    });

    useEffect(() => {
        if (mediaUrl) {
        const transformations = ["f_auto"];
        
        if (audioSettings.extractAudio || audioSettings.audioOnly) {
            // Extract audio only
            transformations.push(`f_${audioSettings.audioFormat}`);
            if (audioSettings.audioBitrate !== 128) {
            transformations.push(`br_${audioSettings.audioBitrate}k`);
            }
        } else {
            // Video with audio modifications
            if (audioSettings.mute) {
            transformations.push("ac_none");
            } else if (audioSettings.volume !== 100) {
            transformations.push(`e_volume:${audioSettings.volume}`);
            }
        }

        const url = generateTransformUrl(mediaUrl, transformations);
        setTransformedUrl(url);
        }
    }, [mediaUrl, audioSettings, generateTransformUrl, setTransformedUrl]);

    const handleAudioSettingChange = (key, value) => {
        setAudioSettings(prev => ({
        ...prev,
        [key]: value
        }));
    };

    const presets = [
        {
        name: 'Original Audio',
        settings: { volume: 100, mute: false, extractAudio: false, audioOnly: false }
        },
        {
        name: 'Boost Volume',
        settings: { volume: 150, mute: false, extractAudio: false, audioOnly: false }
        },
        {
        name: 'Lower Volume', 
        settings: { volume: 50, mute: false, extractAudio: false, audioOnly: false }
        },
        {
        name: 'Silent Video',
        settings: { volume: 100, mute: true, extractAudio: false, audioOnly: false }
        },
        {
        name: 'Extract Audio Only',
        settings: { volume: 100, mute: false, extractAudio: true, audioOnly: true }
        }
    ];

    const applyPreset = (preset) => {
        setAudioSettings(prev => ({ ...prev, ...preset.settings }));
    };

    const renderControls = () => (
        <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Audio Controls</h3>
            <div className="flex items-center space-x-2">
            {audioSettings.mute ? (
                <VolumeX className="w-5 h-5 text-red-500" />
            ) : (
                <Volume2 className="w-5 h-5 text-green-500" />
            )}
            </div>
        </div>

        {/* Quick Presets */}
        <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Quick Presets</label>
            <div className="grid grid-cols-1 gap-2">
            {presets.map((preset, index) => (
                <button
                key={index}
                onClick={() => applyPreset(preset)}
                className="p-2 text-left transition-colors border border-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                <div className="text-sm font-medium">{preset.name}</div>
                </button>
            ))}
            </div>
        </div>

        {/* Volume Control */}
        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
            Volume: {audioSettings.volume}%
            {audioSettings.volume > 100 && (
                <span className="ml-2 text-xs text-yellow-500">(Boost)</span>
            )}
            </label>
            <input
            type="range"
            min="0"
            max="200"
            value={audioSettings.volume}
            onChange={(e) => handleAudioSettingChange('volume', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            disabled={audioSettings.mute}
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Silent</span>
            <span>Normal</span>
            <span>Boosted</span>
            </div>
        </div>

        {/* Mute Toggle */}
        <div className="mb-4">
            <label className="flex items-center">
            <input
                type="checkbox"
                checked={audioSettings.mute}
                onChange={(e) => handleAudioSettingChange('mute', e.target.checked)}
                className="mr-2"
            />
            <span className="text-sm">Mute audio completely</span>
            </label>
        </div>

        {/* Extract Audio Section */}
        <div className="p-4 mb-4 border border-gray-300 rounded-lg">
            <div className="flex items-center mb-2">
            <Headphones className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Audio Extraction</span>
            </div>
            
            <label className="flex items-center mb-3">
            <input
                type="checkbox"
                checked={audioSettings.audioOnly}
                onChange={(e) => handleAudioSettingChange('audioOnly', e.target.checked)}
                className="mr-2"
            />
            <span className="text-sm">Extract audio only</span>
            </label>

            {audioSettings.audioOnly && (
            <>
                <div className="mb-3">
                <label className="block mb-1 text-sm">Audio Format</label>
                <select
                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
                    value={audioSettings.audioFormat}
                    onChange={(e) => handleAudioSettingChange('audioFormat', e.target.value)}
                >
                    <option value="mp3">MP3</option>
                    <option value="wav">WAV</option>
                    <option value="aac">AAC</option>
                    <option value="ogg">OGG</option>
                </select>
                </div>

                <div className="mb-3">
                <label className="block mb-1 text-sm">Audio Bitrate</label>
                <select
                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
                    value={audioSettings.audioBitrate}
                    onChange={(e) => handleAudioSettingChange('audioBitrate', parseInt(e.target.value))}
                >
                    <option value={64}>64 kbps (Low)</option>
                    <option value={128}>128 kbps (Standard)</option>
                    <option value={192}>192 kbps (High)</option>
                    <option value={320}>320 kbps (Maximum)</option>
                </select>
                </div>
            </>
            )}
        </div>

        {/* Audio Info */}
        <div className="p-3 mb-4 bg-gray-100 rounded dark:bg-gray-700">
            <div className="text-sm">
            <div className="flex justify-between">
                <span>Output:</span>
                <span className="font-medium">
                {audioSettings.audioOnly ? `Audio (${audioSettings.audioFormat.toUpperCase()})` : 'Video with Audio'}
                </span>
            </div>
            <div className="flex justify-between">
                <span>Volume Level:</span>
                <span className={`font-medium ${
                audioSettings.mute ? 'text-red-500' : 
                audioSettings.volume > 100 ? 'text-yellow-500' : 'text-green-500'
                }`}>
                {audioSettings.mute ? 'Muted' : `${audioSettings.volume}%`}
                </span>
            </div>
            {audioSettings.audioOnly && (
                <div className="flex justify-between">
                <span>Bitrate:</span>
                <span>{audioSettings.audioBitrate} kbps</span>
                </div>
            )}
            </div>
        </div>

        {transformedUrl && (
            <button
            onClick={() => onDownload(
                transformedUrl, 
                audioSettings.audioOnly ? "extracted_audio" : "processed_video"
            )}
            className="inline-flex items-center justify-center w-full px-4 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
            >
            <Download className="w-4 h-4 mr-2" /> 
            Download {audioSettings.audioOnly ? 'Audio' : 'Video'}
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
            supportedFormats="Videos (MP4, WebM, AVI, MOV, MKV)"
            />
        ) : (
            <div className="relative">
            {audioSettings.audioOnly ? (
                <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg dark:bg-gray-700">
                <Headphones className="w-16 h-16 mb-4 text-violet-600" />
                <h3 className="mb-2 text-lg font-semibold">Audio Extraction Mode</h3>
                <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                    The audio will be extracted as {audioSettings.audioFormat.toUpperCase()} format
                    <br />
                    Bitrate: {audioSettings.audioBitrate} kbps
                </p>
                </div>
            ) : (
                <video
                src={transformedUrl || mediaUrl}
                controls
                className="w-full rounded-lg"
                style={{ maxHeight: '400px' }}
                />
            )}
            
            <div className="mt-2 text-sm text-center text-gray-500">
                {audioSettings.mute && 'Audio: Muted'}
                {!audioSettings.mute && !audioSettings.audioOnly && `Volume: ${audioSettings.volume}%`}
                {audioSettings.audioOnly && `Extracting: ${audioSettings.audioFormat.toUpperCase()}`}
            </div>
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

export default VideoAudioTool;
