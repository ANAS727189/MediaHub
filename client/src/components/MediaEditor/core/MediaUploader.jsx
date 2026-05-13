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
                <label className={`flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed transition-colors ${
                darkMode ? "border-gray-700 bg-transparent" : "border-gray-300 bg-transparent"
                } ${className}`}>
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
                        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
            ) : (
                        <div className={`mb-4 rounded-2xl p-3 ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                            <Upload className="w-10 h-10 text-blue-500" />
                        </div>
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
