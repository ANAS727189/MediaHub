import { useState, useEffect } from 'react';
import { ToggleTheme } from '../../../../context/UserContext';
import MediaUploader from '../../core/MediaUploader';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Download } from 'lucide-react';

const CropTool = ({ 
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
    const [crop, setCrop] = useState({
        unit: "%",
        x: 10,
        y: 10,
        width: 80,
        height: 80,
        aspect: undefined,
    });
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (mediaUrl && crop.width && crop.height && imageDimensions.width && imageDimensions.height) {
        const actualX = Math.round((crop.x * imageDimensions.width) / 100);
        const actualY = Math.round((crop.y * imageDimensions.height) / 100);
        const actualWidth = Math.round((crop.width * imageDimensions.width) / 100);
        const actualHeight = Math.round((crop.height * imageDimensions.height) / 100);
        
        const transformations = [
            "f_auto",
            `c_crop,x_${actualX},y_${actualY},w_${actualWidth},h_${actualHeight}`
        ];
        const url = generateTransformUrl(mediaUrl, transformations);
        setTransformedUrl(url);
        }
    }, [mediaUrl, crop, imageDimensions, generateTransformUrl, setTransformedUrl]);

    const handleAspectRatioChange = (ratio) => {
        setCrop(prev => ({
        ...prev,
        aspect: ratio === "free" ? undefined : parseFloat(ratio)
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
            <label className="block mb-1 text-sm">Aspect Ratio</label>
            <select
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
            value={crop.aspect === undefined ? "free" : crop.aspect}
            onChange={(e) => handleAspectRatioChange(e.target.value)}
            >
            <option value="free">Free</option>
            <option value={1}>Square (1:1)</option>
            <option value={16 / 9}>Widescreen (16:9)</option>
            <option value={4 / 3}>Standard (4:3)</option>
            <option value={3 / 2}>Photo (3:2)</option>
            <option value={9 / 16}>Portrait (9:16)</option>
            </select>
        </div>

        <div className="mb-4">
            <h4 className="mb-2 text-sm font-medium">Crop Position & Size</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
            <div>X: {crop.x?.toFixed(1)}%</div>
            <div>Y: {crop.y?.toFixed(1)}%</div>
            <div>Width: {crop.width?.toFixed(1)}%</div>
            <div>Height: {crop.height?.toFixed(1)}%</div>
            </div>
        </div>

        <p className="mb-4 text-sm text-gray-500">
            Adjust the cropping area on the image preview.
        </p>

        {transformedUrl && (
            <button
            onClick={() => onDownload(transformedUrl, "cropped_image")}
            className="inline-flex items-center justify-center w-full px-4 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
            >
            <Download className="w-4 h-4 mr-2" /> Download Cropped Image
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
            <ReactCrop
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
                onComplete={(c, percentCrop) => setCrop(percentCrop)}
            >
                <img
                src={mediaUrl}
                alt="Crop preview"
                onLoad={(e) => {
                    setImageDimensions({
                    width: e.currentTarget.naturalWidth,
                    height: e.currentTarget.naturalHeight,
                    });
                }}
                style={{ maxHeight: '400px', maxWidth: '100%' }}
                />
            </ReactCrop>
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

export default CropTool;
