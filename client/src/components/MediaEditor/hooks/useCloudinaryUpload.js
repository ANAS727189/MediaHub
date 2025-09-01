import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

export const useCloudinaryUpload = () => {
    const [uploading, setUploading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [mediaUrl, setMediaUrl] = useState("");
    const [isVideo, setIsVideo] = useState(false);

    const uploadFile = useCallback(async (file) => {
        if (!file) return null;

        setUploading(true);
        setIsVideo(file.type.startsWith("video"));

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "Upload");

        try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/dsk0fzyho/${file.type.startsWith("video") ? "video" : "image"}/upload`,
            { method: "POST", body: formData }
        );

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }

        const data = await response.json();
        setMediaUrl(data.secure_url);
        setUploadedFile(data);
        toast.success("File uploaded successfully!");
        
        return data;
        } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Upload failed. Please try again.");
        return null;
        } finally {
        setUploading(false);
        }
    }, []);

    const resetUpload = useCallback(() => {
        setUploadedFile(null);
        setMediaUrl("");
        setIsVideo(false);
    }, []);

    return {
        uploading,
        uploadedFile,
        mediaUrl,
        isVideo,
        uploadFile,
        resetUpload
    };
};
