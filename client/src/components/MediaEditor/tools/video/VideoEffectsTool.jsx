import { useState, useEffect } from 'react';
import { ToggleTheme } from '../../../../context/UserContext';
import MediaUploader from '../../core/MediaUploader';
import { Download } from 'lucide-react';

const VideoEffectsTool = ({ 
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
    const [effects, setEffects] = useState({
        effect: "none",
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hue: 0,
        gamma: 100,
        vibrance: 0,
        sepia: 0,
        blur: 0,
        sharpen: 0,
        vignette: 0
    });

    useEffect(() => {
        if (mediaUrl) {
        const transformations = ["f_auto"];
        
        if (effects.effect !== "none") {
            transformations.push(`e_${effects.effect}`);
        }
        if (effects.brightness !== 100) {
            transformations.push(`e_brightness:${effects.brightness - 100}`);
        }
        if (effects.contrast !== 100) {
            transformations.push(`e_contrast:${effects.contrast - 100}`);
        }
        if (effects.saturation !== 100) {
            transformations.push(`e_saturation:${effects.saturation - 100}`);
        }
        if (effects.hue !== 0) {
            transformations.push(`e_hue:${effects.hue}`);
        }
        if (effects.gamma !== 100) {
            transformations.push(`e_gamma:${effects.gamma}`);
        }
        if (effects.vibrance !== 0) {
            transformations.push(`e_vibrance:${effects.vibrance}`);
        }
        if (effects.sepia > 0) {
            transformations.push(`e_sepia:${effects.sepia}`);
        }
        if (effects.blur > 0) {
            transformations.push(`e_blur:${effects.blur}`);
        }
        if (effects.sharpen > 0) {
            transformations.push(`e_sharpen:${effects.sharpen}`);
        }
        if (effects.vignette > 0) {
            transformations.push(`e_vignette:${effects.vignette}`);
        }

        const url = generateTransformUrl(mediaUrl, transformations);
        setTransformedUrl(url);
        }
    }, [mediaUrl, effects, generateTransformUrl, setTransformedUrl]);

    const handleEffectChange = (key, value) => {
        setEffects(prev => ({
        ...prev,
        [key]: value
        }));
    };

    const resetEffects = () => {
        setEffects({
        effect: "none",
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hue: 0,
        gamma: 100,
        vibrance: 0,
        sepia: 0,
        blur: 0,
        sharpen: 0,
        vignette: 0
        });
    };

    const presetEffects = [
        { name: "None", values: { effect: "none" }},
        { name: "Vintage", values: { sepia: 80, contrast: 110, brightness: 90, vignette: 30 }},
        { name: "Cinematic", values: { contrast: 120, saturation: 85, vignette: 20, gamma: 90 }},
        { name: "Black & White", values: { effect: "grayscale", contrast: 110 }},
        { name: "Warm", values: { hue: 10, brightness: 105, saturation: 110 }},
        { name: "Cool", values: { hue: -10, brightness: 95, saturation: 90 }},
        { name: "High Contrast", values: { contrast: 140, saturation: 120, sharpen: 50 }},
        { name: "Soft", values: { blur: 100, brightness: 105, contrast: 90 }}
    ];

    const applyPreset = (preset) => {
        setEffects(prev => ({
        ...prev,
        ...preset.values
        }));
    };

    const renderControls = () => (
        <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Video Effects</h3>
            <button
            onClick={resetEffects}
            className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
            >
            Reset All
            </button>
        </div>

        {/* Preset Effects */}
        <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Preset Effects</label>
            <div className="grid grid-cols-2 gap-2">
            {presetEffects.map((preset, index) => (
                <button
                key={index}
                onClick={() => applyPreset(preset)}
                className="px-3 py-2 text-sm text-left border border-gray-300 rounded hover:bg-gray-50 hover:text-slate-900"
                >
                {preset.name}
                </button>
            ))}
            </div>
        </div>

        {/* Manual Effects */}
        <div className="space-y-4">
            {/* Base Effect */}
            <div>
            <label className="block mb-2 text-sm font-medium">Base Effect</label>
            <select
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
                value={effects.effect}
                onChange={(e) => handleEffectChange('effect', e.target.value)}
            >
                <option value="none">None</option>
                <option value="sepia">Sepia</option>
                <option value="grayscale">Grayscale</option>
                <option value="negate">Negative</option>
                <option value="oil_paint">Oil Paint</option>
                <option value="cartoonify">Cartoonify</option>
            </select>
            </div>

            {/* Brightness */}
            <div>
            <label className="block mb-2 text-sm font-medium">
                Brightness: {effects.brightness}%
            </label>
            <input
                type="range"
                min="0"
                max="200"
                value={effects.brightness}
                onChange={(e) => handleEffectChange('brightness', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            </div>

            {/* Contrast */}
            <div>
            <label className="block mb-2 text-sm font-medium">
                Contrast: {effects.contrast}%
            </label>
            <input
                type="range"
                min="0"
                max="200"
                value={effects.contrast}
                onChange={(e) => handleEffectChange('contrast', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            </div>

            {/* Saturation */}
            <div>
            <label className="block mb-2 text-sm font-medium">
                Saturation: {effects.saturation}%
            </label>
            <input
                type="range"
                min="0"
                max="200"
                value={effects.saturation}
                onChange={(e) => handleEffectChange('saturation', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            </div>

            {/* Hue */}
            <div>
            <label className="block mb-2 text-sm font-medium">
                Hue Shift: {effects.hue}°
            </label>
            <input
                type="range"
                min="-180"
                max="180"
                value={effects.hue}
                onChange={(e) => handleEffectChange('hue', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            </div>

            {/* Blur */}
            <div>
            <label className="block mb-2 text-sm font-medium">
                Blur: {effects.blur}
            </label>
            <input
                type="range"
                min="0"
                max="2000"
                value={effects.blur}
                onChange={(e) => handleEffectChange('blur', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            </div>

            {/* Vignette */}
            <div>
            <label className="block mb-2 text-sm font-medium">
                Vignette: {effects.vignette}
            </label>
            <input
                type="range"
                min="0"
                max="100"
                value={effects.vignette}
                onChange={(e) => handleEffectChange('vignette', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            </div>
        </div>

        {transformedUrl && (
            <button
            onClick={() => onDownload(transformedUrl, "enhanced_video")}
            className="inline-flex items-center justify-center w-full px-4 py-2 mt-6 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
            >
            <Download className="w-4 h-4 mr-2" /> Download Enhanced Video
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
                src={transformedUrl || mediaUrl}
                controls
                className="w-full rounded-lg"
                style={{ maxHeight: '400px' }}
            />
            <div className="mt-2 text-sm text-center text-gray-500">
                Live Preview - Effects Applied
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

export default VideoEffectsTool;
