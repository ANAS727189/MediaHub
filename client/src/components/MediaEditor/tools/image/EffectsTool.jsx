import { useState, useEffect } from 'react';
import { ToggleTheme } from '../../../../context/UserContext';
import MediaUploader from '../../core/MediaUploader';
import { Download } from 'lucide-react';

const EffectsTool = ({ 
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
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturation: 100,
        gamma: 100,
        hue: 0,
        vibrance: 0,
        sharpen: 0
    });

    useEffect(() => {
        if (mediaUrl) {
        const transformations = ["f_auto"];
        
        // Add effect transformations
        if (effects.effect !== "none") {
            transformations.push(`e_${effects.effect}`);
        }
        if (effects.blur > 0) {
            transformations.push(`e_blur:${effects.blur}`);
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
        if (effects.gamma !== 100) {
            transformations.push(`e_gamma:${effects.gamma}`);
        }
        if (effects.hue !== 0) {
            transformations.push(`e_hue:${effects.hue}`);
        }
        if (effects.vibrance !== 0) {
            transformations.push(`e_vibrance:${effects.vibrance}`);
        }
        if (effects.sharpen > 0) {
            transformations.push(`e_sharpen:${effects.sharpen}`);
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
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturation: 100,
        gamma: 100,
        hue: 0,
        vibrance: 0,
        sharpen: 0
        });
    };

    const renderControls = () => (
        <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Image Effects</h3>
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
            <option value="vignette">Vignette</option>
            <option value="cartoonify">Cartoonify</option>
            <option value="blackwhite">Black & White</option>
            </select>
        </div>

        {/* Blur Control */}
        <div className="mb-4">
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

        {/* Brightness Control */}
        <div className="mb-4">
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

        {/* Contrast Control */}
        <div className="mb-4">
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

        {/* Saturation Control */}
        <div className="mb-4">
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

        {/* Hue Control */}
        <div className="mb-4">
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

        {/* Vibrance Control */}
        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
            Vibrance: {effects.vibrance}
            </label>
            <input
            type="range"
            min="-100"
            max="100"
            value={effects.vibrance}
            onChange={(e) => handleEffectChange('vibrance', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
        </div>

        {/* Sharpen Control */}
        <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">
            Sharpen: {effects.sharpen}
            </label>
            <input
            type="range"
            min="0"
            max="400"
            value={effects.sharpen}
            onChange={(e) => handleEffectChange('sharpen', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
        </div>

        {transformedUrl && (
            <button
            onClick={() => onDownload(transformedUrl, "enhanced_image")}
            className="inline-flex items-center justify-center w-full px-4 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
            >
            <Download className="w-4 h-4 mr-2" /> Download Enhanced Image
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
                alt="Effects preview"
                className="w-full rounded-lg"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
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

export default EffectsTool;
