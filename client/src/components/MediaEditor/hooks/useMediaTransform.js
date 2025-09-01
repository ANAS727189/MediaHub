import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

export const useMediaTransform = () => {
    const [transformedUrl, setTransformedUrl] = useState("");
    const [transformHistory, setTransformHistory] = useState([]);

    const generateTransformUrl = useCallback((mediaUrl, transformations) => {
        if (!mediaUrl || !transformations) return "";
        
        try {
            const transformationArray = Array.isArray(transformations) ? transformations : [transformations];
            const transformationString = transformationArray.join(",");
            if (mediaUrl.includes('cloudinary.com')) {
                const urlParts = mediaUrl.split("/upload/");
                if (urlParts.length !== 2) {
                    console.error("Invalid Cloudinary URL format:", mediaUrl);
                    return mediaUrl;
                }
                
                const baseUrl = urlParts[0] + "/upload/";
                const publicIdWithPath = urlParts[1];

                return `${baseUrl}${transformationString}/${publicIdWithPath}`;
            }
            return mediaUrl;
        } catch (error) {
            console.error("Error generating transform URL:", error);
            return mediaUrl;
        }
    }, []);

    const applyTransform = useCallback((mediaUrl, transformations) => {
        const url = generateTransformUrl(mediaUrl, transformations);
        if (url) {
        setTransformedUrl(url);
        setTransformHistory(prev => [...prev, url]);
        toast.info("Transformation applied!");
        }
        return url;
    }, [generateTransformUrl]);

    const downloadMedia = useCallback(async (url, filename = "transformed_media") => {
        if (!url) return;
        
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = blobUrl;

            
            let extension = "png"; 

            const formatMatch = url.match(/f_([^,/]+)/);
            if (formatMatch) {
                const format = formatMatch[1];
                const formatExtensions = {
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
                    'ogg': 'ogv'
                };
                extension = formatExtensions[format] || format;
            } else {
                const contentType = response.headers.get("Content-Type");
                if (contentType) {
                    if (contentType.includes("jpeg")) extension = "jpg";
                    else if (contentType.includes("webp")) extension = "webp";
                    else if (contentType.includes("gif")) extension = "gif";
                    else if (contentType.includes("png")) extension = "png";
                    else if (contentType.includes("tiff")) extension = "tiff";
                    else if (contentType.includes("bmp")) extension = "bmp";
                    else if (contentType.includes("avif")) extension = "avif";
                    else if (contentType.includes("mp4")) extension = "mp4";
                    else if (contentType.includes("webm")) extension = "webm";
                    else if (contentType.includes("avi")) extension = "avi";
                    else if (contentType.includes("mov")) extension = "mov";
                }
            }

            a.download = `${filename}.${extension}`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(blobUrl);
            toast.success(`Download completed! Saved as ${filename}.${extension}`);
        } catch (error) {
            console.error("Download failed", error);
            toast.error("Download failed.");
        }
    }, []);

    const resetTransforms = useCallback(() => {
        setTransformedUrl("");
        setTransformHistory([]);
    }, []);

    return {
        transformedUrl,
        transformHistory,
        generateTransformUrl,
        applyTransform,
        downloadMedia,
        resetTransforms,
        setTransformedUrl
    };
};
