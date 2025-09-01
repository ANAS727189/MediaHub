import { useState, useEffect } from 'react';
import { ToggleTheme } from '../../../../context/UserContext';
import MediaUploader from '../../core/MediaUploader';
import { Download } from 'lucide-react';

const ResizeTool = ({ 
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
    const [dimensions, setDimensions] = useState({
        width: 800,
        height: 600
    });
    const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
    const [originalAspectRatio, setOriginalAspectRatio] = useState(1);

    useEffect(() => {
        if (uploadedFile && uploadedFile.width && uploadedFile.height) {
        setOriginalAspectRatio(uploadedFile.width / uploadedFile.height);
        setDimensions({
            width: uploadedFile.width,
            height: uploadedFile.height
        });
        }
    }, [uploadedFile]);

    useEffect(() => {
        if (mediaUrl && dimensions.width && dimensions.height) {
        const transformations = [
            "f_auto",
            `w_${dimensions.width}`,
            `h_${dimensions.height}`
        ];
        const url = generateTransformUrl(mediaUrl, transformations);
        setTransformedUrl(url);
        }
    }, [mediaUrl, dimensions, generateTransformUrl, setTransformedUrl]);

    const handleWidthChange = (width) => {
        const newWidth = parseInt(width) || 0;
        setDimensions(prev => ({
        width: newWidth,
        height: maintainAspectRatio ? Math.round(newWidth / originalAspectRatio) : prev.height
        }));
    };

    const handleHeightChange = (height) => {
        const newHeight = parseInt(height) || 0;
        setDimensions(prev => ({
        width: maintainAspectRatio ? Math.round(newHeight * originalAspectRatio) : prev.width,
        height: newHeight
        }));
    };

    const renderControls = () => (
        <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        {uploadedFile && (
            <p className="mb-4 text-sm text-gray-500">
            Original Size: {uploadedFile.width} x {uploadedFile.height}
            </p>
        )}
        
        <div className="mb-4">
            <label className="flex items-center mb-2">
            <input
                type="checkbox"
                checked={maintainAspectRatio}
                onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                className="mr-2"
            />
            <span className="text-sm">Maintain aspect ratio</span>
            </label>
        </div>

        <div className="mb-4">
            <label className="block mb-1 text-sm">Width (pixels)</label>
            <input
            type="number"
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
            value={dimensions.width}
            onChange={(e) => handleWidthChange(e.target.value)}
            min="1"
            max="5000"
            />
        </div>

        <div className="mb-4">
            <label className="block mb-1 text-sm">Height (pixels)</label>
            <input
            type="number"
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
            value={dimensions.height}
            onChange={(e) => handleHeightChange(e.target.value)}
            min="1"
            max="5000"
            disabled={maintainAspectRatio}
            />
        </div>

        {transformedUrl && (
            <button
            onClick={() => onDownload(transformedUrl, "resized_image")}
            className="inline-flex items-center justify-center w-full px-4 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
            >
            <Download className="w-4 h-4 mr-2" /> Download Resized Image
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
                alt="Resized preview"
                className="w-full rounded-lg"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
            <div className="mt-2 text-sm text-gray-500">
                Preview: {dimensions.width} x {dimensions.height}
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

export default ResizeTool;
