import ResizeTool from '../tools/image/ResizeTool';
import CropTool from '../tools/image/CropTool';
import EffectsTool from '../tools/image/EffectsTool';
import CompressTool from '../tools/image/CompressTool';
import RotateTool from '../tools/image/RotateTool';

import VideoTrimTool from '../tools/video/VideoTrimTool';
import VideoEffectsTool from '../tools/video/VideoEffectsTool';
import VideoAudioTool from '../tools/video/VideoAudioTool';

// Conversion Tools
import FormatConversionTool from '../tools/conversion/FormatConversionTool';

import ComingSoonTool from '../tools/shared/ComingSoonTool';

const ToolRouter = ({ 
    activeFeature, 
    mediaUrl, 
    uploadedFile, 
    uploading, 
    onFileUpload, 
    transformedUrl, 
    setTransformedUrl,
    onDownload,
    generateTransformUrl,
    resetUpload 
    }) => {
    const toolProps = {
        mediaUrl,
        uploadedFile,
        uploading,
        onFileUpload,
        transformedUrl,
        setTransformedUrl,
        onDownload,
        generateTransformUrl,
        resetUpload
    };

    switch (activeFeature) {
        // Image Tools
        case 'resize':
        return <ResizeTool {...toolProps} />;
        case 'crop':
        return <CropTool {...toolProps} />;
        case 'effects':
        return <EffectsTool {...toolProps} />;
        case 'compress':
        return <CompressTool {...toolProps} />;
        case 'rotate':
        return <RotateTool {...toolProps} />;

        // Video Tools
        case 'video-trim':
        return <VideoTrimTool {...toolProps} />;
        case 'video-effects':
        return <VideoEffectsTool {...toolProps} />;
        case 'video-audio':
        return <VideoAudioTool {...toolProps} />;

        // Conversion Tools
        case 'format':
        case 'convert-from-jpg':
        return <FormatConversionTool {...toolProps} />;

        // Other Tools - Coming Soon
        case 'watermark':
        case 'border':
        case 'upscale':
        case 'img-to-pdf':
        case 'video-resize':
        case 'video-speed':
        case 'video-watermark':
        default:
        return <ComingSoonTool featureId={activeFeature} {...toolProps} />;
    }
};

export default ToolRouter;
