import {
    Maximize2,
    Crop,
    FileImage,
    RotateCcw,
    Filter,
    FileType,
    PenTool,
    Stamp,
    FileText,
    Zap,
    Scissors,
    Volume2,
    Play,
    Pause,
    SkipForward,
    Rewind,
    Settings
} from "lucide-react";

export const IMAGE_TOOLS = [
    {
        icon: Maximize2,
        title: "Resize Image",
        description: "Define dimensions by pixel values to resize your images.",
        id: "resize",
        category: "image"
    },
    {
        icon: Crop,
        title: "Crop Image",
        description: "Crop your images by selecting a mode and (optionally) an aspect ratio.",
        id: "crop",
        category: "image"
    },
    {
        icon: FileImage,
        title: "Compress Image",
        description: "Reduce file size while maintaining quality with adjustable compression.",
        id: "compress",
        category: "enhancement"
    },
    {
        icon: RotateCcw,
        title: "Rotate Image",
        description: "Rotate your images to the desired angle.",
        id: "rotate",
        category: "image"
    },
    {
        icon: Filter,
        title: "Effects",
        description: "Adjust blur, brightness, contrast, and saturation.",
        id: "effects",
        category: "enhancement"
    },
    {
        icon: Stamp,
        title: "Watermark Image",
        description: "Overlay a custom watermark on your images.",
        id: "watermark",
        category: "enhancement"
    },
    {
        icon: PenTool,
        title: "Add Border",
        description: "Add a customizable border to your image.",
        id: "border",
        category: "enhancement"
    },
    {
        icon: Zap,
        title: "Upscale Image",
        description: "Improve the resolution of your images using AI.",
        id: "upscale",
        category: "enhancement"
    }
    ];

    export const VIDEO_TOOLS = [
    {
        icon: Scissors,
        title: "Trim Video",
        description: "Cut and trim video segments to desired length.",
        id: "video-trim",
        category: "video"
    },
    {
        icon: Maximize2,
        title: "Resize Video",
        description: "Change video dimensions and resolution.",
        id: "video-resize",
        category: "video"
    },
    {
        icon: Volume2,
        title: "Audio Controls",
        description: "Adjust volume, mute, or extract audio from video.",
        id: "video-audio",
        category: "video"
    },
    {
        icon: Filter,
        title: "Video Effects",
        description: "Apply filters and color corrections to your video.",
        id: "video-effects",
        category: "video"
    },
    {
        icon: SkipForward,
        title: "Speed Control",
        description: "Change video playback speed - slow motion or fast forward.",
        id: "video-speed",
        category: "video"
    },
    {
        icon: Stamp,
        title: "Video Watermark",
        description: "Add watermarks or overlays to your video.",
        id: "video-watermark",
        category: "video"
    }
    ];

    export const CONVERSION_TOOLS = [
    {
        icon: FileType,
        title: "Convert Format",
        description: "Convert your images or videos to a different format.",
        id: "format",
        category: "conversion"
    },
    {
        icon: FileText,
        title: "Image to PDF",
        description: "Convert your image into a PDF file.",
        id: "img-to-pdf",
        category: "conversion"
    },
    {
        icon: FileImage,
        title: "Convert from JPG",
        description: "Convert JPG images to other formats.",
        id: "convert-from-jpg",
        category: "conversion"
    }
];

export const ALL_TOOLS = [...IMAGE_TOOLS, ...VIDEO_TOOLS, ...CONVERSION_TOOLS];
