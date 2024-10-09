import React, { useState, useCallback } from "react";
import { ToggleTheme } from "../../context/UserContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  RotateCcw, Link, Download, Maximize2, Filter, 
  Loader2, Sliders, Crop, Rotate3D, FileType,
  Image as ImageIcon, FileImage, Edit3, ArrowUp, 
  Stamp, Smile, FileCode, Minimize2, PenTool
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, isNew, onClick }) => {
  const { darkMode } = ToggleTheme();
  
  return (
    <div 
      className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-lg transition-all cursor-pointer relative`}
      onClick={onClick}
    >
      {isNew && (
        <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
          New!
        </span>
      )}
      <div className="mb-4">
        <Icon className={`w-12 h-12 ${darkMode ? 'text-violet-400' : 'text-violet-600'}`} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
    </div>
  );
};

const MediaEditor = () => {
  const { darkMode } = ToggleTheme();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("");
  const [transformedUrl, setTransformedUrl] = useState("");
  const [transformHistory, setTransformHistory] = useState([]);
  const [isVideo, setIsVideo] = useState(false);
  const [activeTab, setActiveTab] = useState("resize");
  const [activeFeature, setActiveFeature] = useState(null);

  const [transformOptions, setTransformOptions] = useState({
    width: 800,
    height: 800,
    format: "auto",
    quality: 80,
    effect: "none",
    crop: "scale",
    zoom: 1,
    rotation: 0,
    blur: 0,
    brightness: 100,
    contrast: 100,
    saturation: 100,
  });

  const features = [
    {
      icon: Minimize2,
      title: "Compress Image",
      description: "Compress JPG, PNG, SVG, and GIFs while saving space and maintaining quality.",
      id: "compress"  // Unique ID for Compress
    },
    {
      icon: Maximize2,
      title: "Resize Image",
      description: "Define your dimensions, by percent or pixel, and resize your JPG, PNG, SVG, and GIF images.",
      id: "resize"  // Unique ID for Resize
    },
    {
      icon: Crop,
      title: "Crop Image",
      description: "Crop JPG, PNG, or GIFs with ease. Choose pixels to define your rectangle or use our visual editor.",
      id: "crop"  // Unique ID for Crop
    },
    {
      icon: FileImage,
      title: "Upscale Image",
      description: "Upscale images and improve their quality.",
      id: "upscale"  // Unique ID for Upscale
    },
    {
      icon: Sliders,
      title: "Blur Image",
      description: "Apply blur effect to your images.",
      id: "blur"  // Unique ID for Blur
    },
    {
      icon: RotateCcw,
      title: "Rotate Image",
      description: "Rotate images with precision.",
      id: "rotate"  // Unique ID for Rotate
    },
    {
      icon: PenTool,
      title: "Photo Editor",
      description: "Edit your photos with various tools.",
      id: "photo-editor"  // Unique ID for Photo Editor
    },
    {
      icon: FileImage,
      title: "Convert from JPG",
      description: "Convert JPG images to other formats.",
      id: "convert-from-jpg"  // Unique ID for Convert
    },
  ];
  const handleFeatureClick = (featureId) => {
    setActiveFeature(featureId);
    setActiveTab(featureId);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      setIsVideo(file.type.startsWith('video'));
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Upload");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dsk0fzyho/${isVideo ? 'video' : 'image'}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        
        if (!response.ok) throw new Error(`Upload failed: ${response.statusText}`);
        
        const data = await response.json();
        setMediaUrl(data.secure_url);
        setUploadedFile(data);
        setTransformHistory([data.secure_url]);
        toast.success("File uploaded successfully!");
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Upload failed. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

  const applyTransformation = useCallback(() => {
    if (!uploadedFile) return;
  
    const baseUrl = mediaUrl.split('/upload/')[0] + '/upload/';
  
    const transformations = [
      `c_${transformOptions.crop}`,
      `w_${transformOptions.width}`,
      `h_${transformOptions.height}`,
      activeTab !== 'compress' ? `w_${transformOptions.width}` : null,
      activeTab !== 'compress' ? `h_${transformOptions.height}` : null,
      activeTab === 'compress' ? `q_auto:good` : `q_${transformOptions.quality}`,
      activeTab === 'compress' ? `f_auto` : null, 
      transformOptions.effect !== "none" ? `e_${transformOptions.effect}` : null,
      transformOptions.zoom !== 1 ? `z_${transformOptions.zoom}` : null,
      transformOptions.rotation !== 0 ? `a_${transformOptions.rotation}` : null,
      transformOptions.blur > 0 ? `e_blur:${transformOptions.blur}` : null,
      transformOptions.brightness !== 100 ? `e_brightness:${transformOptions.brightness}` : null,
      transformOptions.contrast !== 100 ? `e_contrast:${transformOptions.contrast}` : null,
      transformOptions.saturation !== 100 ? `e_saturation:${transformOptions.saturation}` : null,
      transformOptions.format !== "auto" ? `f_${transformOptions.format}` : null,
    ].filter(Boolean).join(',');
  
    const publicId = mediaUrl.split('/upload/')[1];
    const newTransformedUrl = `${baseUrl}${transformations}/${publicId}`;
  
    setTransformedUrl(newTransformedUrl);
    setTransformHistory([...transformHistory, newTransformedUrl]);
    toast.info("Transformation applied!");
  }, [mediaUrl, transformOptions, transformHistory, uploadedFile]);

  const renderUploadArea = () => (
    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        {uploading ? (
          <Loader2 className="h-12 w-12 animate-spin text-violet-600" />
        ) : (
          <FileImage className="h-16 w-16 text-violet-600 mb-4" />
        )}
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Images (PNG, JPG, WebP) or Videos (MP4, WebM)
        </p>
      </div>
      <input
        type="file"
        className="hidden"
        onChange={handleFileUpload}
        accept="image/*,video/*"
      />
    </label>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'resize':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm mb-1">Width</label>
              <input
                type="number"
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
                value={transformOptions.width}
                onChange={(e) => setTransformOptions({ ...transformOptions, width: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Height</label>
              <input
                type="number"
                className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
                value={transformOptions.height}
                onChange={(e) => setTransformOptions({ ...transformOptions, height: e.target.value })}
              />
            </div>
          </>
        );
      case 'effects':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm mb-1">Blur</label>
              <input
                type="range"
                min="0"
                max="2000"
                className="w-full"
                value={transformOptions.blur}
                onChange={(e) => setTransformOptions({ ...transformOptions, blur: parseInt(e.target.value) })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Brightness</label>
              <input
                type="range"
                min="0"
                max="200"
                className="w-full"
                value={transformOptions.brightness}
                onChange={(e) => setTransformOptions({ ...transformOptions, brightness: parseInt(e.target.value) })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Contrast</label>
              <input
                type="range"
                min="0"
                max="200"
                className="w-full"
                value={transformOptions.contrast}
                onChange={(e) => setTransformOptions({ ...transformOptions, contrast: parseInt(e.target.value) })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Saturation</label>
              <input
                type="range"
                min="0"
                max="200"
                className="w-full"
                value={transformOptions.saturation}
                onChange={(e) => setTransformOptions({ ...transformOptions, saturation: parseInt(e.target.value) })}
              />
            </div>
          </>
        );
      case 'crop':
        return (
          <div className="mb-4">
            <label className="block text-sm mb-1">Crop Mode</label>
            <select
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
              value={transformOptions.crop}
              onChange={(e) => setTransformOptions({ ...transformOptions, crop: e.target.value })}
            >
              <option value="scale">Scale</option>
              <option value="fit">Fit</option>
              <option value="fill">Fill</option>
              <option value="crop">Crop</option>
            </select>
          </div>
        );
      case 'rotate':
        return (
          <div className="mb-4">
            <label className="block text-sm mb-1">Rotation (degrees)</label>
            <input
              type="number"
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
              value={transformOptions.rotation}
              onChange={(e) => setTransformOptions({ ...transformOptions, rotation: parseInt(e.target.value) })}
            />
          </div>
        );
      case 'format':
        return (
          <div className="mb-4">
            <label className="block text-sm mb-1">Format</label>
            <select
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
              value={transformOptions.format}
              onChange={(e) => setTransformOptions({ ...transformOptions, format: e.target.value })}
            >
              <option value="auto">Auto</option>
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="webp">WebP</option>
              {isVideo && (
                <>
                  <option value="mp4">MP4</option>
                  <option value="webm">WebM</option>
                </>
              )}
            </select>
          </div>
        );
        case 'compress':
        return (
          <div className="mb-4">
            <label className="block text-sm mb-1">Compress (High - Low)</label>
            <input
              type="range"
              min="1"
              max="100"
              value={transformOptions.quality}
              onChange={(e) => setTransformOptions({ ...transformOptions, quality: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderEditor = () => {
    if (!activeFeature) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              isNew={feature.isNew}
              onClick={() => handleFeatureClick(feature.id)}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          {!mediaUrl ? renderUploadArea() : (
            <div className="relative">
              {isVideo ? (
                <video 
                  src={transformedUrl || mediaUrl} 
                  controls 
                  className="w-full rounded-lg"
                />
              ) : (
                <img 
                  src={transformedUrl || mediaUrl} 
                  alt="Uploaded media" 
                  className="w-full rounded-lg"
                />
              )}
            </div>
          )}
        </div>

        {mediaUrl && (
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
               <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('resize')}
                  className={`flex items-center px-4 py-2 rounded-lg ${activeTab === 'resize' ? 'bg-violet-600 text-black' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  <Maximize2 className="w-4 h-4 mr-2" /> Resize
                </button>
                <button
                  onClick={() => setActiveTab('effects')}
                  className={`flex items-center px-4 py-2 rounded-lg ${activeTab === 'effects' ? 'bg-violet-600 text-black' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  <Filter className="w-4 h-4 mr-2" /> Effects
                </button>
                <button
                  onClick={() => setActiveTab('crop')}
                  className={`flex items-center px-4 py-2 rounded-lg ${activeTab === 'crop' ? 'bg-violet-600 text-black' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  <Crop className="w-4 h-4 mr-2" /> Crop
                </button>
                <button
                  onClick={() => setActiveTab('rotate')}
                  className={`flex items-center px-4 py-2 rounded-lg ${activeTab === 'rotate' ? 'bg-violet-600 text-black' : 'bg-gray-200  dark:bg-gray-700'}`}
                >
                  <Rotate3D className="w-4 h-4 mr-2" /> Rotate
                </button>
                <button
                  onClick={() => setActiveTab('format')}
                  className={`flex items-center px-4 py-2 rounded-lg ${activeTab === 'format' ? 'bg-violet-600 text-black' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  <FileType className="w-4 h-4 mr-2" /> Format
                </button>
                <button
                  onClick={() => setActiveTab('compress')}
                  className={`flex items-center px-4 py-2 rounded-lg ${activeTab === 'compress' ? 'bg-violet-600 text-black' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  <FileType className="w-4 h-4 mr-2" /> Compress Image
                </button>
              </div>

              {renderTabContent()}
            <button
              onClick={applyTransformation}
              className="w-full px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Apply Transformation
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <ToastContainer theme={darkMode ? 'dark' : 'light'} />
      
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Professional Media Editor</h1>
          {activeFeature && (
            <button 
              onClick={() => setActiveFeature(null)}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Back to Features
            </button>
          )}
        </div>
        
        {renderEditor()}
      </div>
    </div>
  );
};

export default MediaEditor;