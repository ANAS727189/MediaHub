import { useState, useEffect } from 'react';
import { ToggleTheme } from '../../../../context/UserContext';
import MediaUploader from '../../core/MediaUploader';
import { Download, FileImage, FileVideo, RefreshCw } from 'lucide-react';

const FormatConversionTool = ({ 
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
    const [isVideo, setIsVideo] = useState(false);
    const [conversionSettings, setConversionSettings] = useState({
        outputFormat: 'auto',
        quality: 'auto',
        optimize: true
    });


    const imageFormats = [
        { 
        value: 'jpg', 
        label: 'JPEG', 
        description: 'Best for photos, smaller file size',
        extension: '.jpg',
        color: 'text-orange-600'
        },
        { 
        value: 'png', 
        label: 'PNG', 
        description: 'Best for graphics, supports transparency',
        extension: '.png',
        color: 'text-green-600'
        },
        { 
        value: 'webp', 
        label: 'WebP', 
        description: 'Modern format, excellent compression',
        extension: '.webp',
        color: 'text-blue-600'
        },
        { 
        value: 'gif', 
        label: 'GIF', 
        description: 'Animated images, limited colors',
        extension: '.gif',
        color: 'text-purple-600'
        },
        { 
        value: 'tiff', 
        label: 'TIFF', 
        description: 'High quality, uncompressed',
        extension: '.tiff',
        color: 'text-indigo-600'
        },
        { 
        value: 'bmp', 
        label: 'BMP', 
        description: 'Windows bitmap format',
        extension: '.bmp',
        color: 'text-gray-600'
        },
        { 
        value: 'ico', 
        label: 'ICO', 
        description: 'Icon format for websites',
        extension: '.ico',
        color: 'text-yellow-600'
        },
        { 
        value: 'avif', 
        label: 'AVIF', 
        description: 'Next-gen format, best compression',
        extension: '.avif',
        color: 'text-red-600'
        }
    ];


    const videoFormats = [
        { 
        value: 'mp4', 
        label: 'MP4', 
        description: 'Most compatible, web-friendly',
        extension: '.mp4',
        color: 'text-blue-600'
        },
        { 
        value: 'webm', 
        label: 'WebM', 
        description: 'Open source, web optimized',
        extension: '.webm',
        color: 'text-green-600'
        },
        { 
        value: 'avi', 
        label: 'AVI', 
        description: 'Windows video format',
        extension: '.avi',
        color: 'text-purple-600'
        },
        { 
        value: 'mov', 
        label: 'MOV', 
        description: 'Apple QuickTime format',
        extension: '.mov',
        color: 'text-gray-600'
        },
        { 
        value: 'mkv', 
        label: 'MKV', 
        description: 'High quality, supports subtitles',
        extension: '.mkv',
        color: 'text-orange-600'
        },
        { 
        value: 'flv', 
        label: 'FLV', 
        description: 'Flash video format',
        extension: '.flv',
        color: 'text-red-600'
        },
        { 
        value: 'ogv', 
        label: 'OGV', 
        description: 'Open source video format',
        extension: '.ogv',
        color: 'text-yellow-600'
        }
    ];

    useEffect(() => {
        if (uploadedFile && uploadedFile.resource_type) {
        setIsVideo(uploadedFile.resource_type === 'video');
        }
    }, [uploadedFile]);

    useEffect(() => {
        if (mediaUrl && conversionSettings.outputFormat !== 'auto') {
        const transformations = [];
        
        const formatMap = {
            'jpg': 'jpg',
            'jpeg': 'jpg',
            'png': 'png',
            'webp': 'webp',
            'gif': 'gif',
            'tiff': 'tiff',
            'bmp': 'bmp',
            'ico': 'ico',
            'avif': 'avif',
            'mp4': 'mp4',
            'webm': 'webm',
            'avi': 'avi',
            'mov': 'mov',
            'mkv': 'mkv',
            'flv': 'flv',
            'ogv': 'ogg'
        };
        
        const cloudinaryFormat = formatMap[conversionSettings.outputFormat] || conversionSettings.outputFormat;
        transformations.push(`f_${cloudinaryFormat}`);
        
        if (conversionSettings.quality !== 'auto') {
            transformations.push(`q_${conversionSettings.quality}`);
        }
        
        if (conversionSettings.optimize) {
            if (!isVideo) {
            transformations.push('fl_progressive:semi');
            }
        }

        const url = generateTransformUrl(mediaUrl, transformations);
        if (url && url !== mediaUrl) {
            setTransformedUrl(url);
            console.log('✅ URL transformation successful');
        } else {
            console.error('❌ URL transformation failed or same as original');
            setTransformedUrl('');
        }
        } else {
        setTransformedUrl('');
        }
    }, [mediaUrl, conversionSettings, generateTransformUrl, setTransformedUrl, isVideo]);

    const handleSettingChange = (key, value) => {
        setConversionSettings(prev => ({
        ...prev,
        [key]: value
        }));
        if (key === 'outputFormat' && value === 'auto') {
        setTransformedUrl('');
        }
    };

    const getCurrentFormat = () => {
        if (!uploadedFile) return null;
        return uploadedFile.format?.toLowerCase() || 'unknown';
    };

    const getTargetFormat = () => {
        const formats = isVideo ? videoFormats : imageFormats;
        return formats.find(f => f.value === conversionSettings.outputFormat);
    };

    const getEstimatedFileSize = () => {
        if (!uploadedFile || conversionSettings.outputFormat === 'auto') return null;
        
        const originalSize = uploadedFile.bytes;
        const targetFormat = getTargetFormat();

        const sizeMultipliers = {
        'jpg': 0.7,
        'png': 1.2,
        'webp': 0.5,
        'avif': 0.3,
        'gif': 0.8,
        'tiff': 2.0,
        'bmp': 3.0,
        'ico': 0.1,
        'mp4': 0.8,
        'webm': 0.6,
        'avi': 1.5,
        'mov': 1.2,
        'mkv': 1.0,
        'flv': 0.7,
        'ogv': 0.9
        };

        const multiplier = sizeMultipliers[conversionSettings.outputFormat] || 1;
        const qualityMultiplier = conversionSettings.quality === 'auto' ? 1 : conversionSettings.quality / 100;
        
        return Math.round(originalSize * multiplier * qualityMultiplier);
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const renderControls = () => (
        <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <div className="flex items-center mb-6">
            <RefreshCw className="w-6 h-6 mr-2 text-violet-600" />
            <h3 className="text-lg font-semibold">Format Conversion</h3>
        </div>

        {/* Current Format Info */}
        {uploadedFile && (
            <div className="p-4 mb-6 bg-gray-100 rounded-lg dark:bg-gray-700">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Current Format:</span>
                <div className="flex items-center">
                {isVideo ? <FileVideo className="w-4 h-4 mr-1" /> : <FileImage className="w-4 h-4 mr-1" />}
                <span className="font-bold text-blue-600 uppercase">{getCurrentFormat()}</span>
                </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>File Size:</span>
                <span>{formatFileSize(uploadedFile.bytes)}</span>
            </div>
            {uploadedFile.width && uploadedFile.height && (
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Dimensions:</span>
                <span>{uploadedFile.width} × {uploadedFile.height}</span>
                </div>
            )}
            </div>
        )}

        {/* Format Selection */}
        <div className="mb-6">
            <label className="block mb-3 text-sm font-medium">
            Convert to {isVideo ? 'Video' : 'Image'} Format:
            </label>
            <div className="grid grid-cols-1 gap-2 overflow-y-auto max-h-64">
            {(isVideo ? videoFormats : imageFormats).map((format) => (
                <button
                key={format.value}
                onClick={() => handleSettingChange('outputFormat', format.value)}
                className={`p-3 text-left border rounded-lg transition-all ${
                    conversionSettings.outputFormat === format.value
                    ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20 shadow-md'
                    : 'border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                >
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                    <span className={`font-bold text-lg ${format.color} mr-2`}>
                        {format.label}
                    </span>
                    <span className="px-2 py-1 text-xs text-gray-500 bg-gray-200 rounded dark:bg-gray-600">
                        {format.extension}
                    </span>
                    </div>
                    {conversionSettings.outputFormat === format.value && (
                    <RefreshCw className="w-4 h-4 text-violet-600" />
                    )}
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {format.description}
                </p>
                </button>
            ))}
            </div>
        </div>

        {/* Quality Settings */}
        {conversionSettings.outputFormat !== 'auto' && (
            <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Quality:</label>
            <select
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
                value={conversionSettings.quality}
                onChange={(e) => handleSettingChange('quality', e.target.value)}
            >
                <option value="auto">Auto (Recommended)</option>
                <option value="100">Best Quality (100%)</option>
                <option value="90">High Quality (90%)</option>
                <option value="80">Good Quality (80%)</option>
                <option value="70">Medium Quality (70%)</option>
                <option value="60">Web Quality (60%)</option>
                <option value="40">Low Quality (40%)</option>
            </select>
            </div>
        )}

        {/* Optimization Options */}
        <div className="mb-6">
            <label className="flex items-center">
            <input
                type="checkbox"
                checked={conversionSettings.optimize}
                onChange={(e) => handleSettingChange('optimize', e.target.checked)}
                className="mr-2"
            />
            <span className="text-sm">
                Optimize for web delivery
                <span className="block text-xs text-gray-500">
                Reduces file size while maintaining quality
                </span>
            </span>
            </label>
        </div>

        {/* Conversion Summary */}
        {conversionSettings.outputFormat !== 'auto' && uploadedFile && (
            <div className="p-4 mb-6 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700">
            <h4 className="mb-2 font-medium text-blue-800 dark:text-blue-200">Conversion Summary</h4>
            <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                <span>From:</span>
                <span className="font-medium uppercase">{getCurrentFormat()}</span>
                </div>
                <div className="flex justify-between">
                <span>To:</span>
                <span className="font-medium uppercase text-violet-600">
                    {getTargetFormat()?.label}
                </span>
                </div>
                <div className="flex justify-between">
                <span>Quality:</span>
                <span>{conversionSettings.quality === 'auto' ? 'Auto' : `${conversionSettings.quality}%`}</span>
                </div>
                {getEstimatedFileSize() && (
                <div className="flex justify-between">
                    <span>Est. Size:</span>
                    <span className="text-green-600">{formatFileSize(getEstimatedFileSize())}</span>
                </div>
                )}
            </div>
            </div>
        )}

        {transformedUrl && conversionSettings.outputFormat !== 'auto' && (
            <button
            onClick={() => {
                const filename = `converted_${uploadedFile?.public_id || 'file'}`;
                console.log(`Downloading ${filename} as ${getTargetFormat()?.label} format`);
                onDownload(transformedUrl, filename);
            }}
            className="inline-flex items-center justify-center w-full px-4 py-2 text-white transition-colors rounded-lg shadow-lg bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
            >
            <Download className="w-4 h-4 mr-2" /> 
            Download {getTargetFormat()?.label} File
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
            accept="image/*,video/*"
            supportedFormats="Images and Videos (All formats supported)"
            />
        ) : (
            <div className="relative">
            {isVideo ? (
                <>
                <video
                    key={transformedUrl || mediaUrl} // Force re-render on URL change
                    src={transformedUrl || mediaUrl}
                    controls
                    className="w-full rounded-lg"
                    style={{ maxHeight: '400px' }}
                    onError={(e) => {
                    console.error('Video load error:', e);
                    // Fallback to original if transformed URL fails
                    if (transformedUrl && e.target.src === transformedUrl) {
                        e.target.src = mediaUrl;
                    }
                    }}
                />
                {transformedUrl && transformedUrl !== mediaUrl && (
                    <div className="absolute px-2 py-1 text-xs font-medium text-white rounded top-2 left-2 bg-gradient-to-r from-green-500 to-green-600">
                    Converted to {getTargetFormat()?.label}
                    </div>
                )}
                </>
            ) : (
                <>
                <img
                    key={transformedUrl || mediaUrl} // Force re-render on URL change
                    src={transformedUrl || mediaUrl}
                    alt="Format conversion preview"
                    className="w-full rounded-lg"
                    style={{ maxHeight: '400px', objectFit: 'contain' }}
                    onError={(e) => {
                    console.error('Image load error:', e);
                    console.error('Failed URL:', e.target.src);
                    // Fallback to original if transformed URL fails
                    if (transformedUrl && e.target.src === transformedUrl) {
                        e.target.src = mediaUrl;
                    }
                    }}
                    onLoad={() => {
                    console.log('Image loaded successfully:', transformedUrl || mediaUrl);
                    }}
                />
                {transformedUrl && transformedUrl !== mediaUrl && (
                    <div className="absolute px-2 py-1 text-xs font-medium text-white rounded top-2 left-2 bg-gradient-to-r from-green-500 to-green-600">
                    Converted to {getTargetFormat()?.label}
                    </div>
                )}
                </>
            )}
            
            <div className="flex justify-center mt-4">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm ${
                conversionSettings.outputFormat === 'auto' 
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    : 'bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900 dark:to-purple-900 text-violet-700 dark:text-violet-300'
                }`}>
                {conversionSettings.outputFormat === 'auto' ? (
                    <>
                    <FileImage className="w-4 h-4 mr-2" />
                    Select format to convert
                    </>
                ) : (
                    <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Converting to {getTargetFormat()?.label}
                    </>
                )}
                </div>
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

export default FormatConversionTool;
