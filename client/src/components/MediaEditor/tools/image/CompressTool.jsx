import { useState, useEffect } from 'react';
import { ToggleTheme } from '../../../../context/UserContext';
import MediaUploader from '../../core/MediaUploader';
import { Download } from 'lucide-react';

const CompressTool = ({ 
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
    const [quality, setQuality] = useState(80);
    const [format, setFormat] = useState('auto');

    useEffect(() => {
        if (mediaUrl) {
        const transformations = [
            `q_${quality}`,
            `f_${format}`
        ];
        const url = generateTransformUrl(mediaUrl, transformations);
        setTransformedUrl(url);
        }
    }, [mediaUrl, quality, format, generateTransformUrl, setTransformedUrl]);

    const compressionPresets = [
        { name: 'High Quality', quality: 90, description: 'Minimal compression, best quality' },
        { name: 'Balanced', quality: 80, description: 'Good balance of quality and size' },
        { name: 'Web Optimized', quality: 65, description: 'Optimized for web use' },
        { name: 'High Compression', quality: 45, description: 'Maximum compression, smaller file' }
    ];

    const renderControls = () => (
        <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <h3 className="mb-4 text-lg font-semibold">Compression Settings</h3>

        {/* Preset Buttons */}
        <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Quick Presets</label>
            <div className="grid grid-cols-1 gap-2">
            {compressionPresets.map((preset, index) => (
                <button
                key={index}
                onClick={() => setQuality(preset.quality)}
                className={`p-3 text-left border rounded-lg transition-colors ${
                    quality === preset.quality
                    ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20'
                    : 'border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                >
                <div className="font-medium">{preset.name}</div>
                <div className="text-sm text-gray-500">{preset.description}</div>
                </button>
            ))}
            </div>
        </div>

        {/* Manual Quality Control */}
        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
            Quality: {quality}% 
            <span className="ml-2 text-xs text-gray-500">
                ({quality >= 80 ? 'High' : quality >= 60 ? 'Medium' : 'Low'} Quality)
            </span>
            </label>
            <input
            type="range"
            min="1"
            max="100"
            value={quality}
            onChange={(e) => setQuality(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Smallest</span>
            <span>Best Quality</span>
            </div>
        </div>

        {/* Format Selection */}
        <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Output Format</label>
            <select
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            >
            <option value="auto">Auto (Optimized)</option>
            <option value="jpg">JPEG</option>
            <option value="png">PNG</option>
            <option value="webp">WebP (Smaller)</option>
            </select>
        </div>

        {/* File Size Estimation */}
        {uploadedFile && (
            <div className="p-3 mb-4 bg-gray-100 rounded dark:bg-gray-700">
            <div className="text-sm">
                <div className="flex justify-between">
                <span>Original Size:</span>
                <span>{(uploadedFile.bytes / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <div className="flex justify-between">
                <span>Estimated Size:</span>
                <span className="text-green-600">
                    {((uploadedFile.bytes * quality / 100) / 1024 / 1024).toFixed(2)} MB
                </span>
                </div>
                <div className="flex justify-between font-medium">
                <span>Compression:</span>
                <span className="text-blue-600">~{100 - quality}%</span>
                </div>
            </div>
            </div>
        )}

        {transformedUrl && (
            <button
            onClick={() => onDownload(transformedUrl, "compressed_image")}
            className="inline-flex items-center justify-center w-full px-4 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
            >
            <Download className="w-4 h-4 mr-2" /> Download Compressed Image
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
            accept="image/*"
            supportedFormats="Images (PNG, JPG, WebP, GIF)"
            />
        ) : (
            <div className="relative">
            <img
                src={transformedUrl || mediaUrl}
                alt="Compression preview"
                className="w-full rounded-lg"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
            <div className="mt-2 text-sm text-center text-gray-500">
                Quality: {quality}% | Format: {format.toUpperCase()}
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

export default CompressTool;
