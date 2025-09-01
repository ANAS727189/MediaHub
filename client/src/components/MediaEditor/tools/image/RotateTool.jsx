import { useState, useEffect } from 'react';
import { ToggleTheme } from '../../../../context/UserContext';
import MediaUploader from '../../core/MediaUploader';
import { Download, RotateCcw, RotateCw } from 'lucide-react';

const RotateTool = ({ 
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
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        if (mediaUrl) {
        const transformations = [
            "f_auto",
            `a_${rotation}`
        ];
        const url = generateTransformUrl(mediaUrl, transformations);
        setTransformedUrl(url);
        }
    }, [mediaUrl, rotation, generateTransformUrl, setTransformedUrl]);

    const quickRotations = [
        { angle: 0, label: '0°' },
        { angle: 90, label: '90°' },
        { angle: 180, label: '180°' },
        { angle: 270, label: '270°' }
    ];

    const handleQuickRotation = (angle) => {
        setRotation(angle);
    };

    const handleRotateLeft = () => {
        setRotation(prev => prev - 90);
    };

    const handleRotateRight = () => {
        setRotation(prev => prev + 90);
    };

    const resetRotation = () => {
        setRotation(0);
    };

    const renderControls = () => (
        <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Rotation Settings</h3>
            <button
            onClick={resetRotation}
            className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
            >
            Reset
            </button>
        </div>

        {/* Quick Rotation Buttons */}
        <div className="mb-6">
            <label className="block mb-3 text-sm font-medium">Quick Rotations</label>
            <div className="grid grid-cols-2 gap-2">
            <button
                onClick={handleRotateLeft}
                className="flex items-center justify-center px-4 py-3 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
                <RotateCcw className="w-5 h-5 mr-2" />
                Rotate Left
            </button>
            <button
                onClick={handleRotateRight}
                className="flex items-center justify-center px-4 py-3 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
                <RotateCw className="w-5 h-5 mr-2" />
                Rotate Right
            </button>
            </div>
        </div>

        {/* Preset Angles */}
        <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Preset Angles</label>
            <div className="grid grid-cols-4 gap-2">
            {quickRotations.map((preset) => (
                <button
                key={preset.angle}
                onClick={() => handleQuickRotation(preset.angle)}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    rotation % 360 === preset.angle % 360
                    ? 'bg-violet-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                >
                {preset.label}
                </button>
            ))}
            </div>
        </div>

        {/* Fine Angle Control */}
        <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">
            Fine Adjustment: {rotation}°
            </label>
            <input
            type="range"
            min="-180"
            max="180"
            value={rotation}
            onChange={(e) => setRotation(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>-180°</span>
            <span>0°</span>
            <span>+180°</span>
            </div>
        </div>

        {/* Manual Input */}
        <div className="mb-6">
            <label className="block mb-1 text-sm font-medium">Manual Angle Input</label>
            <div className="flex space-x-2">
            <input
                type="number"
                className="flex-1 px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
                value={rotation}
                onChange={(e) => setRotation(parseInt(e.target.value) || 0)}
                placeholder="Enter angle..."
            />
            <span className="flex items-center px-3 py-2 text-gray-500 bg-gray-100 rounded-lg dark:bg-gray-700">
                degrees
            </span>
            </div>
        </div>

        {/* Current Rotation Info */}
        <div className="p-3 mb-6 bg-gray-100 rounded dark:bg-gray-700">
            <div className="text-sm">
            <div className="flex justify-between">
                <span>Current Rotation:</span>
                <span className="font-medium">{rotation}°</span>
            </div>
            <div className="flex justify-between">
                <span>Normalized:</span>
                <span>{((rotation % 360) + 360) % 360}°</span>
            </div>
            </div>
        </div>

        {transformedUrl && (
            <button
            onClick={() => onDownload(transformedUrl, "rotated_image")}
            className="inline-flex items-center justify-center w-full px-4 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
            >
            <Download className="w-4 h-4 mr-2" /> Download Rotated Image
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
                alt="Rotation preview"
                className="w-full rounded-lg"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
            <div className="mt-2 text-sm text-center text-gray-500">
                Rotation: {rotation}°
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

export default RotateTool;
