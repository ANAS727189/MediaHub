import { Construction } from 'lucide-react';
import { ToggleTheme } from '../../../../context/UserContext';
import MediaUploader from '../../core/MediaUploader';

const ComingSoonTool = ({ 
    featureId,
    uploading, 
    onFileUpload
    }) => {
    const { darkMode } = ToggleTheme();

    const getFeatureName = (id) => {
        const featureNames = {
        'compress': 'Image Compression',
        'rotate': 'Image Rotation',
        'format': 'Format Conversion',
        'watermark': 'Watermark',
        'border': 'Add Border',
        'upscale': 'Image Upscaling',
        'img-to-pdf': 'Image to PDF',
        'convert-from-jpg': 'JPG Conversion',
        'video-resize': 'Video Resizing',
        'video-audio': 'Audio Controls',
        'video-speed': 'Speed Control',
        'video-watermark': 'Video Watermark'
        };
        return featureNames[id] || 'This Feature';
    };

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Preview Area */}
        <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
            <MediaUploader
            uploading={uploading}
            onFileUpload={onFileUpload}
            accept="image/*,video/*"
            supportedFormats="Images and Videos (All formats supported)"
            />
        </div>

        {/* Coming Soon Panel */}
        <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg flex flex-col items-center justify-center`}>
            <Construction className="w-16 h-16 mb-4 text-violet-600" />
            <h3 className="mb-2 text-xl font-semibold">{getFeatureName(featureId)}</h3>
            <p className={`text-center ${darkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>
            This feature is currently under development and will be available soon.
            </p>
            <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            <p>• Advanced processing capabilities</p>
            <p>• Real-time preview</p>
            <p>• Multiple output formats</p>
            <p>• Batch processing support</p>
            </div>
        </div>
        </div>
    );
};

export default ComingSoonTool;
