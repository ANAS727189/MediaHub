import { Loader2, FileImage, Upload } from "lucide-react";
import { ToggleTheme } from "../../../context/UserContext";

const MediaUploader = ({ 
    uploading, 
    onFileUpload, 
    accept = "image/*,video/*",
    supportedFormats = "Images (PNG, JPG, WebP) or Videos (MP4, WebM)",
    className = ""
    }) => {
    const { darkMode } = ToggleTheme();

    return (
        <label className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
        darkMode ? "border-gray-600" : "border-gray-300"
        } ${className}`}>
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
            <Loader2 className="w-12 h-12 animate-spin text-violet-600" />
            ) : (
            <Upload className="w-16 h-16 mb-4 text-violet-600" />
            )}
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">
                {uploading ? "Uploading..." : "Click to upload"}
            </span>
            {!uploading && " or drag and drop"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
            {supportedFormats}
            </p>
        </div>
        <input 
            type="file" 
            className="hidden" 
            onChange={onFileUpload} 
            accept={accept}
            disabled={uploading}
        />
        </label>
    );
};

export default MediaUploader;
