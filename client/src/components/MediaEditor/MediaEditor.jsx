import { useState, useCallback, useEffect } from "react";
import { ToggleTheme } from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  RotateCcw,
  Download,
  Maximize2,
  Filter,
  Loader2,
  Crop,
  FileImage,
  PenTool,
  FileType,
  Stamp,
  FileText,
} from "lucide-react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const FeatureCard = ({ icon: Icon, title, description, onClick }) => {
  const { darkMode } = ToggleTheme();
  return (
    <div
      className={`p-6 rounded-lg ${
        darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
      } shadow-lg transition-all cursor-pointer`}
      onClick={onClick}
    >
      <div className="mb-4">
        <Icon
          className={`w-12 h-12 ${darkMode ? "text-violet-400" : "text-violet-600"}`}
        />
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        {description}
      </p>
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
  // Use activeFeature to drive the transformation controls
  const [activeFeature, setActiveFeature] = useState(null);
  // Initialize crop with x, y, width and computed height (for 16:9)
  const [crop, setCrop] = useState({
    unit: "%",
    x: 0,
    y: 0,
    width: 30,
    height: (30 * 9) / 16, // ~16.88
    aspect: 16 / 9,
  });
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  // Extend transform options with new properties
  const [transformOptions, setTransformOptions] = useState({
    width: 800,
    height: 800,
    format: "auto",
    quality: 80,
    effect: "none",
    crop: "scale",
    cropAspect: "free", // Added aspect ratio for crop
    zoom: 1,
    rotation: 0,
    blur: 0,
    brightness: 100,
    contrast: 100,
    saturation: 100,
    // New options for watermark and border
    watermarkText: "",
    watermarkPosition: "south_east",
    borderSize: 5,
    borderColor: "black",
  });

  // Updated features array with additional options
  const features = [
    {
      icon: Maximize2,
      title: "Resize Image",
      description: "Define dimensions by pixel values to resize your images.",
      id: "resize",
    },
    {
      icon: Crop,
      title: "Crop Image",
      description: "Crop your images by selecting a mode and (optionally) an aspect ratio.",
      id: "crop",
    },
    {
      icon: FileImage,
      title: "Compress Image",
      description: "Reduce file size while maintaining quality with adjustable compression.",
      id: "compress",
    },
    {
      icon: RotateCcw,
      title: "Rotate Image",
      description: "Rotate your images to the desired angle.",
      id: "rotate",
    },
    {
      icon: Filter,
      title: "Effects",
      description: "Adjust blur, brightness, contrast, and saturation.",
      id: "effects",
    },
    {
      icon: FileType,
      title: "Convert Format",
      description: "Convert your images or videos to a different format.",
      id: "format",
    },
    {
      icon: PenTool,
      title: "Photo Editor",
      description: "Additional editing tools coming soon.",
      id: "photo-editor",
    },
    {
      icon: FileImage,
      title: "Upscale Image",
      description: "Improve the resolution of your images.",
      id: "upscale",
    },
    {
      icon: FileImage,
      title: "Convert from JPG",
      description: "Convert JPG images to other formats.",
      id: "convert-from-jpg",
    },
    // New features:
    {
      icon: Stamp,
      title: "Watermark Image",
      description: "Overlay a custom watermark on your images.",
      id: "watermark",
    },
    {
      icon: FileText,
      title: "Image to PDF",
      description: "Convert your image into a PDF file.",
      id: "img-to-pdf",
    },
    {
      icon: PenTool,
      title: "Add Border",
      description: "Add a customizable border to your image.",
      id: "border",
    },
  ];

  // When a feature is selected, clear previous transformation
  const handleFeatureClick = (featureId) => {
    setActiveFeature(featureId);
    setTransformedUrl("");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      setIsVideo(file.type.startsWith("video"));

      // Get image dimensions before upload
      if (!isVideo) {
        const img = new Image();
        img.onload = () => {
          setImageDimensions({ width: img.width, height: img.height });
        };
        img.src = URL.createObjectURL(file);
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Upload");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dsk0fzyho/${isVideo ? "video" : "image"}/upload`,
          { method: "POST", body: formData }
        );

        if (!response.ok)
          throw new Error(`Upload failed: ${response.statusText}`);

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

  // Compute transformation URL based on active feature and options
  const computeTransformedUrl = () => {
    if (!mediaUrl || !activeFeature) return "";
    const transformationArray = [];

    // Preserve original format
    transformationArray.push("f_auto");

    switch (activeFeature) {
      case "resize":
        transformationArray.push(`w_${transformOptions.width}`);
        transformationArray.push(`h_${transformOptions.height}`);
        break;
      case "crop": {
        const actualX = Math.round(
          (transformOptions.x * imageDimensions.width) / 100
        );
        const actualY = Math.round(
          (transformOptions.y * imageDimensions.height) / 100
        );
        const actualWidth = Math.round(
          (transformOptions.width * imageDimensions.width) / 100
        );
        const actualHeight = Math.round(
          (transformOptions.height * imageDimensions.height) / 100
        );
        transformationArray.push(
          `c_crop,x_${actualX},y_${actualY},w_${actualWidth},h_${actualHeight}`
        );
        break;
      }
      case "compress":
        transformationArray.push(`q_${transformOptions.quality}`);
        transformationArray.push(`f_auto`);
        break;
      case "rotate":
        transformationArray.push(`a_${transformOptions.rotation}`);
        break;
      case "effects":
        if (transformOptions.effect !== "none") {
          transformationArray.push(`e_${transformOptions.effect}`);
        }
        if (transformOptions.blur > 0) {
          transformationArray.push(`e_blur:${transformOptions.blur}`);
        }
        if (transformOptions.brightness !== 100) {
          transformationArray.push(`e_brightness:${transformOptions.brightness}`);
        }
        if (transformOptions.contrast !== 100) {
          transformationArray.push(`e_contrast:${transformOptions.contrast}`);
        }
        if (transformOptions.saturation !== 100) {
          transformationArray.push(`e_saturation:${transformOptions.saturation}`);
        }
        break;
      case "format":
        if (transformOptions.format !== "auto") {
          transformationArray.push(`f_${transformOptions.format}`);
        }
        break;
      // New feature: Watermark
      case "watermark":
        if (transformOptions.watermarkText) {
          transformationArray.push(
            `l_text:arial_20:${encodeURIComponent(
              transformOptions.watermarkText
            )}`
          );
          transformationArray.push(`g_${transformOptions.watermarkPosition}`);
          transformationArray.push("fl_layer_apply");
        } else {
          toast.error("Please enter watermark text.");
          return "";
        }
        break;
      // New feature: Image to PDF
      case "img-to-pdf":
        transformationArray.push("f_pdf");
        break;
      // New feature: Border
      case "border":
        transformationArray.push(
          `bo_${transformOptions.borderSize}px_solid_${transformOptions.borderColor}`
        );
        break;
      default:
        return "";
    }
    const transformations = transformationArray.join(",");
    const baseUrl = mediaUrl.split("/upload/")[0] + "/upload/";
    const publicId = mediaUrl.split("/upload/")[1];
    return `${baseUrl}${transformations}/${publicId}`;
  };

  // Live preview update for interactive features
  useEffect(() => {
    if (
      mediaUrl &&
      ["crop", "resize", "watermark", "border"].includes(activeFeature)
    ) {
      const url = computeTransformedUrl();
      setTransformedUrl(url);
    }
  }, [activeFeature, transformOptions, mediaUrl]);

  // Manual transformation application for other features
  const applyTransformation = useCallback(() => {
    if (!uploadedFile || !activeFeature) return;
    const url = computeTransformedUrl();
    if (!url) return;
    console.log("Transformed URL:", url);
    setTransformedUrl(url);
    setTransformHistory([...transformHistory, url]);
    toast.info("Transformation applied!");
  }, [mediaUrl, transformOptions, transformHistory, uploadedFile, activeFeature]);

  // Download handler: open new tab and trigger file download
  const handleDownload = async () => {
    if (!transformedUrl) return;
    try {
      const response = await fetch(transformedUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;

      // Determine file extension based on Content-Type
      const contentType = response.headers.get("Content-Type");
      let extension = "png"; // default
      if (contentType) {
        if (contentType.includes("jpeg")) extension = "jpg";
        else if (contentType.includes("webp")) extension = "webp";
        else if (contentType.includes("gif")) extension = "gif";
        else if (contentType.includes("pdf")) extension = "pdf";
      }

      a.download = `downloaded_image.${extension}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed", error);
      toast.error("Download failed.");
    }
  };

  const renderUploadArea = () => (
    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        {uploading ? (
          <Loader2 className="w-12 h-12 animate-spin text-violet-600" />
        ) : (
          <FileImage className="w-16 h-16 mb-4 text-violet-600" />
        )}
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Images (PNG, JPG, WebP) or Videos (MP4, WebM)
        </p>
      </div>
      <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*,video/*" />
    </label>
  );

  // Render transformation controls for the active feature
  // For the "crop" feature, we now only display controls (aspect ratio, original size, etc.)
  const renderFeatureControls = () => {
    const originalSize =
      ["crop", "resize"].includes(activeFeature) &&
      uploadedFile && (
        <p className="mb-4 text-sm text-gray-500">
          Original Size: {uploadedFile.width} x {uploadedFile.height}
        </p>
      );
    switch (activeFeature) {
      case "resize":
        return (
          <>
            {originalSize}
            <div className="mb-4">
              <label className="block mb-1 text-sm">Width</label>
              <input
                type="number"
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
                value={transformOptions.width}
                onChange={(e) =>
                  setTransformOptions({ ...transformOptions, width: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Height</label>
              <input
                type="number"
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
                value={transformOptions.height}
                onChange={(e) =>
                  setTransformOptions({ ...transformOptions, height: e.target.value })
                }
              />
            </div>
          </>
        );
      case "crop":
        return (
          <>
            {originalSize}
            <div className="mb-4">
              <label className="block mb-1 text-sm">Aspect Ratio</label>
              <select
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
                value={crop.aspect === undefined ? "free" : crop.aspect}
                onChange={(e) => {
                  const value = e.target.value;
                  setCrop({
                    ...crop,
                    aspect: value === "free" ? undefined : Number.parseFloat(value),
                  });
                }}
              >
                <option value={16 / 9}>16:9</option>
                <option value={4 / 3}>4:3</option>
                <option value={1}>1:1</option>
                <option value="free">Free</option>
              </select>
            </div>
            <p className="text-sm text-gray-500">
              Adjust the cropping area on the left.
            </p>
          </>
        );
      case "compress":
        return (
          <div className="mb-4">
            <label className="block mb-1 text-sm">Compression Quality (High to Low)</label>
            <input
              type="range"
              min="1"
              max="100"
              value={transformOptions.quality}
              onChange={(e) =>
                setTransformOptions({ ...transformOptions, quality: Number.parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>
        );
      case "rotate":
        return (
          <div className="mb-4">
            <label className="block mb-1 text-sm">Rotation (degrees)</label>
            <input
              type="number"
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
              value={transformOptions.rotation}
              onChange={(e) =>
                setTransformOptions({ ...transformOptions, rotation: Number.parseInt(e.target.value) })
              }
            />
          </div>
        );
      case "effects":
        return (
          <>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Effect</label>
              <select
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
                value={transformOptions.effect}
                onChange={(e) =>
                  setTransformOptions({ ...transformOptions, effect: e.target.value })
                }
              >
                <option value="none">None</option>
                <option value="sepia">Sepia</option>
                <option value="grayscale">Grayscale</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Blur</label>
              <input
                type="range"
                min="0"
                max="2000"
                className="w-full"
                value={transformOptions.blur}
                onChange={(e) =>
                  setTransformOptions({ ...transformOptions, blur: Number.parseInt(e.target.value) })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Brightness</label>
              <input
                type="range"
                min="0"
                max="200"
                className="w-full"
                value={transformOptions.brightness}
                onChange={(e) =>
                  setTransformOptions({ ...transformOptions, brightness: Number.parseInt(e.target.value) })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Contrast</label>
              <input
                type="range"
                min="0"
                max="200"
                className="w-full"
                value={transformOptions.contrast}
                onChange={(e) =>
                  setTransformOptions({ ...transformOptions, contrast: Number.parseInt(e.target.value) })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Saturation</label>
              <input
                type="range"
                min="0"
                max="200"
                className="w-full"
                value={transformOptions.saturation}
                onChange={(e) =>
                  setTransformOptions({ ...transformOptions, saturation: Number.parseInt(e.target.value) })
                }
              />
            </div>
          </>
        );
      case "format":
        return (
          <div className="mb-4">
            <label className="block mb-1 text-sm">Format</label>
            <select
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
              value={transformOptions.format}
              onChange={(e) =>
                setTransformOptions({ ...transformOptions, format: e.target.value })
              }
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
      case "watermark":
        return (
          <>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Watermark Text</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
                value={transformOptions.watermarkText}
                onChange={(e) =>
                  setTransformOptions({ ...transformOptions, watermarkText: e.target.value })
                }
                placeholder="Enter watermark text"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Watermark Position</label>
              <select
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
                value={transformOptions.watermarkPosition}
                onChange={(e) =>
                  setTransformOptions({ ...transformOptions, watermarkPosition: e.target.value })
                }
              >
                <option value="north_west">Top Left</option>
                <option value="north_east">Top Right</option>
                <option value="south_west">Bottom Left</option>
                <option value="south_east">Bottom Right</option>
                <option value="center">Center</option>
              </select>
            </div>
          </>
        );
      case "img-to-pdf":
        return (
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              Click "Apply Transformation" to convert your image to a PDF.
            </p>
          </div>
        );
      case "border":
        return (
          <>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Border Size (px)</label>
              <input
                type="number"
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
                value={transformOptions.borderSize}
                onChange={(e) =>
                  setTransformOptions({ ...transformOptions, borderSize: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Border Color</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-violet-200"
                value={transformOptions.borderColor}
                onChange={(e) =>
                  setTransformOptions({ ...transformOptions, borderColor: e.target.value })
                }
                placeholder="e.g., black or #000000"
              />
            </div>
          </>
        );
      default:
        return <div className="mb-4">Feature controls coming soon.</div>;
    }
  };

  const renderEditor = () => {
    if (!activeFeature) {
      return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              onClick={() => handleFeatureClick(feature.id)}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Panel: Media Preview */}
        <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
          {!mediaUrl ? (
            renderUploadArea()
          ) : (
            <div className="relative">
              {isVideo ? (
                <video src={transformedUrl || mediaUrl} controls className="w-full rounded-lg" />
              ) : activeFeature === "crop" ? (
                <ReactCrop
                  crop={crop}
                  onChange={(newCrop) => setCrop(newCrop)}
                  onComplete={(c, percentCrop) => {
                    // Update crop state with percentage values for consistency
                    setCrop(percentCrop);
                    if (percentCrop && percentCrop.width && percentCrop.height) {
                      setTransformOptions({
                        ...transformOptions,
                        x: percentCrop.x,
                        y: percentCrop.y,
                        width: percentCrop.width,
                        height: percentCrop.height,
                      });
                    }
                  }}
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
                  />
                </ReactCrop>
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

        {/* Right Panel: Transformation Controls */}
        {mediaUrl && (
          <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
            {renderFeatureControls()}
            <button
              onClick={applyTransformation}
              className="w-full px-4 py-2 mb-4 text-white transition-colors rounded-lg bg-violet-600 hover:bg-violet-700"
            >
              Apply Transformation
            </button>
            {transformedUrl && (
              <button
                onClick={handleDownload}
                className="inline-flex items-center justify-center w-full px-4 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
              >
                <Download className="w-4 h-4 mr-2" /> Download
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <ToastContainer theme={darkMode ? "dark" : "light"} />
      <div className="container p-6 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Professional Media Editor</h1>
          {activeFeature && (
            <button
              onClick={() => {
                setActiveFeature(null);
                setUploadedFile(null);
                setMediaUrl("");
                setTransformedUrl("");
              }}
              className="px-4 py-2 text-white transition-colors rounded-lg bg-violet-600 hover:bg-violet-700"
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
