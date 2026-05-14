# MediaHub

<div align="center">

<img src="client/public/video.png" alt="MediaHub Logo" width="120" />

**Professional Media Management Platform**

A comprehensive platform for video streaming, media editing, and content management with professional-grade tools for image and video processing.

<p>
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white" />
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-20-339933?style=flat&logo=node.js&logoColor=white" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-6.0-13AA52?style=flat&logo=mongodb&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white" />
  <img alt="Express.js" src="https://img.shields.io/badge/Express.js-4.0-000000?style=flat&logo=express&logoColor=white" />
  <img alt="FFmpeg" src="https://img.shields.io/badge/FFmpeg-6.0-007808?style=flat&logo=ffmpeg&logoColor=white" />
</p>

<p>
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green?style=flat" />
  <img alt="Version" src="https://img.shields.io/badge/Version-1.0.0-blue?style=flat" />
  <img alt="Build" src="https://img.shields.io/badge/Build-Passing-brightgreen?style=flat" />
  <img alt="Status" src="https://img.shields.io/badge/Status-Active-brightgreen?style=flat" />
</p>

</div>

---

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
  - [Video Streaming and Management](#video-streaming-and-management)
  - [Media Editor](#media-editor)
  - [Authentication and User Management](#authentication-and-user-management)
  - [User Interface](#user-interface)
- [Technical Architecture](#technical-architecture)
  - [Frontend Stack](#frontend-stack)
  - [Backend Stack](#backend-stack)
  - [Authentication and Security](#authentication-and-security)
- [Installation and Setup](#installation-and-setup)
- [API Reference](#api-reference)
- [Configuration](#configuration)
- [Video Processing Pipeline](#video-processing-pipeline)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Contributing](#contributing)
- [License](#license)
- [Repository](#repository)
- [Author](#author)

## Overview

MediaHub is a full-stack media management application built with React, Node.js, and MongoDB. It provides a complete suite of tools for uploading, streaming, editing, and converting media content. The platform supports HLS-based adaptive bitrate video streaming, advanced image and video editing capabilities, and multi-format conversion.

## Core Features

### Video Streaming and Management

- **HLS Video Streaming**: Videos are automatically converted to HTTP Live Streaming format using FFmpeg, enabling adaptive bitrate streaming across different network conditions and devices. The platform generates multiple video segments and a master playlist for seamless playback.
- **Automatic Thumbnail Generation**: Thumbnails are extracted from uploaded videos using FFmpeg and stored in the cloud via Cloudinary for fast delivery.
- **Real-time View Tracking**: Implements real-time analytics to track video views with persistent storage in MongoDB. View counts are incremented on each video playback event.
- **Video Gallery**: Provides both grid and list view options for browsing videos with search and filtering capabilities across title, description, and metadata.
- **Duration Detection**: Automatically extracts video duration using FFprobe and displays in MM:SS format without requiring user input.
- **Metadata Extraction**: Captures video resolution, file size, bitrate, and codec information during upload for comprehensive media metadata.

### Media Editor

The media editor is a comprehensive tool suite supporting both image and video editing operations with real-time preview and quality controls.

#### Image Editing Tools

- **Crop Tool**: Interactive cropping interface with support for custom aspect ratios and preset dimensions. Uses React Image Crop library for precise selection. Coordinates are preserved and applied during export.
- **Resize Tool**: Intelligent image resizing with aspect ratio preservation options. Supports custom dimensions and offers quality presets (low, medium, high) to balance file size and quality.
- **Effects Tool**: Provides pixel-level adjustments including brightness, contrast, saturation, and hue shifting. All adjustments are real-time with live preview on the canvas.
- **Compression Tool**: Advanced compression engine with quality control settings. Supports both lossy and lossless compression modes with visual quality assessment before export.
- **Rotation Tool**: Precise rotation by custom angles (0-360 degrees) and horizontal/vertical flip operations.

#### Video Editing Tools

- **Trim Tool**: Timeline-based video trimming interface for precise cutting operations. Users specify start and end times in seconds. The platform extracts the specified segment using FFmpeg.
- **Effects Tool**: Video color grading and visual filter adjustments. Supports brightness, contrast, and saturation modifications applied during transcoding.
- **Audio Management**: Audio track editing, extraction, and replacement capabilities. Supports audio-only operations on video files.

#### Format Conversion

- **Image Formats**: Support for JPG, PNG, WebP, AVIF, GIF, TIFF, BMP, and ICO formats with automatic quality optimization.
- **Video Formats**: MP4, WebM, AVI, MOV, MKV, FLV, and OGV conversion with customizable bitrate and codec selection.
- **Quality Control**: Granular control over compression settings, allowing users to specify video bitrate (kbps), frame rate, and audio quality independently.

### Authentication and User Management

- **Clerk Integration**: Complete user authentication and management system with support for multiple sign-in methods (email, Google, GitHub, etc.). Handles session management and token refresh automatically.
- **User Profiles**: Personalized user experiences with profile management and content ownership tracking.
- **Protected Routes**: Role-based access control ensures only authenticated users can access upload, editing, and streaming features.

### User Interface

- **Responsive Design**: Fully responsive layouts optimized for desktop, tablet, and mobile devices using Tailwind CSS utility classes.
- **Dark/Light Mode**: System-aware theme switching with user preference persistence. All components support both color modes with semantic color tokens.
- **Modern Components**: Built with Lucide React icons, Video.js for professional video playback, and custom React components for specialized functionality.
- **Interactive Animations**: Smooth transitions and hover effects enhance user feedback and visual hierarchy.

## Technical Architecture

### Frontend Stack

| Technology | Purpose |
| --- | --- |
| React 18 | Modern React with functional components, hooks, and concurrent rendering capabilities. |
| Vite | Lightning-fast build tool providing instant HMR during development with optimized production bundles. |
| Tailwind CSS | Utility-first CSS framework for rapid UI development with semantic design tokens for dark/light mode support. |
| React Router | Client-side routing with lazy-loaded components for optimal code splitting. |
| Lucide React | Comprehensive icon library with consistent SVG-based icons. |
| Video.js | Professional HTML5 video player with adaptive bitrate playback support for HLS streams. |
| React Toastify | Non-blocking notification system for user feedback on operations. |
| React Image Crop | Interactive image cropping component with customizable aspect ratios. |

### Backend Stack

| Technology | Purpose |
| --- | --- |
| Node.js | JavaScript runtime providing asynchronous, event-driven architecture for handling concurrent requests. |
| Express.js | Minimalist web framework for routing, middleware, and API endpoint definitions. |
| MongoDB | NoSQL document database for flexible schema design and horizontal scalability. |
| Mongoose | Object-document mapper providing schema validation, middleware hooks, and query building. |
| Multer | Middleware for handling multipart/form-data uploads with stream-based file processing. |
| FFmpeg | Video processing toolkit for transcoding, segment generation, thumbnail extraction, and metadata probing. |
| Sharp | High-performance image processing library for resizing, cropping, format conversion, and optimization. |
| Cloudinary | Cloud-based media management platform for storing and delivering thumbnails and assets with CDN acceleration. |

### Authentication and Security

- **Clerk**: Complete authentication platform handling user management, session tokens, and multi-factor authentication.
- **CORS**: Cross-origin resource sharing configuration to allow frontend-backend communication with appropriate headers.
- **Route Protection**: Private route components verify authentication status before rendering protected views.

## Installation and Setup

### Prerequisites

- Node.js v18 or later
- npm or yarn package manager
- MongoDB v5.0 or later (local or MongoDB Atlas)
- FFmpeg with libmp3lame support

### Installation Steps

1. Clone the repository:

```bash
git clone https://github.com/ANAS727189/MediaHub.git
cd MediaHub
```

2. Install client dependencies:

```bash
cd client
npm install
```

3. Install server dependencies:

```bash
cd ../server
npm install
```

4. Configure client environment variables in `client/.env`:

```env
VITE_BACKEND_URI=http://localhost:8000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

5. Configure server environment variables in `server/.env`:

```env
PORT=8000
DATABASE_URI=mongodb://localhost:27017/mediahub
CLIENT_URI=http://localhost:5173
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

6. Start development servers in separate terminals:

Terminal 1 - Backend:

```bash
cd server
npm start
```

Terminal 2 - Frontend:

```bash
cd client
npm run dev
```

Access the application at http://localhost:5173

## API Reference

### Video Endpoints

#### `GET /api/videos`

Retrieve all videos with pagination support. Returns an array of video documents with metadata.

Query parameters:

- `page`: Page number (default: `1`)
- `limit`: Videos per page (default: `12`)

Response: Array of video objects

#### `GET /api/videos/:id`

Retrieve a specific video by ID with full details.

Response: Video object

#### `POST /api/upload`

Upload and process a new video file. Triggers FFmpeg conversion to HLS format and thumbnail generation.

Body (`FormData`):

- `file`: Video file (`multipart/form-data`)
- `title`: Video title
- `description`: Video description

Response: Processed video object with HLS playlist path

#### `POST /api/videos/:id/view`

Increment view count for a specified video.

Response: Updated video object with new view count

### Video Object Schema

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  videoPath: String,        // HLS master playlist path (e.g., /uploads/videos/uuid/index.m3u8)
  thumbnailPath: String,    // Thumbnail image URL from Cloudinary
  uploaderId: String,       // Clerk user ID
  uploadDate: Date,         // ISO timestamp
  duration: String,         // MM:SS format (e.g., "5:23")
  views: Number,            // Real-time view count
  metadata: {
    width: Number,          // Video resolution width in pixels
    height: Number,         // Video resolution height in pixels
    fileSize: Number,       // File size in bytes
    bitrate: Number,        // Average bitrate in bits per second
    codec: String,          // Video codec (e.g., "h264")
    audioCodec: String      // Audio codec (e.g., "aac")
  }
}
```

## Configuration

### External Services

#### MongoDB Setup

For development, use local MongoDB:

```bash
brew install mongodb-community
brew services start mongodb-community
```

For production, use MongoDB Atlas:

1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Generate a connection string
4. Add it to `server/.env` as `DATABASE_URI`

#### Cloudinary Configuration

1. Sign up at https://cloudinary.com
2. Navigate to Settings > API Keys
3. Copy Cloud Name, API Key, and API Secret
4. Add them to `server/.env`

#### Clerk Setup

1. Sign up at https://clerk.dev
2. Create a new application
3. Get Publishable Key from Dashboard > API Keys
4. Add it to `client/.env` as `VITE_CLERK_PUBLISHABLE_KEY`

#### FFmpeg Installation

macOS:

```bash
brew install ffmpeg
```

Ubuntu/Debian:

```bash
sudo apt update
sudo apt install ffmpeg
```

Windows: Download from https://ffmpeg.org/download.html

## Video Processing Pipeline

### Upload Flow

1. User selects a video file and submits through the upload form.
2. Server receives the file via Multer with size validation.
3. FFmpeg analyzes video metadata (duration, resolution, codec).
4. Video is transcoded to HLS format with multiple quality variants.
5. Master playlist (`index.m3u8`) and segment files (`.ts`) are generated.
6. Thumbnail is extracted and uploaded to Cloudinary.
7. Video document is persisted to MongoDB with metadata.
8. Response is returned with streaming URL and metadata.

### HLS Streaming Architecture

Video segments are generated at 10-second intervals with multiple quality levels:

- 1080p: 5000 kbps
- 720p: 2500 kbps
- 480p: 1500 kbps
- 360p: 800 kbps

Adaptive bitrate logic selects appropriate quality based on network conditions. Segments are stored in `/server/uploads/videos/{uuid}/`.

### Image Processing Pipeline

1. User uploads an image and selects editing operations.
2. Operations (crop, resize, effects) are applied in sequence.
3. Sharp processes pixel data with specified parameters.
4. Final output is generated in requested format with quality settings.
5. File is returned to the client with appropriate MIME type.

## Project Structure

```text
MediaHub/
├── client/                           # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── MediaEditor/          # Image/video editing tools
│   │   │   │   ├── tools/            # Individual tool components
│   │   │   │   ├── core/             # Canvas and rendering
│   │   │   │   └── hooks/            # Custom hooks for transformations
│   │   │   ├── VideoPlayer/          # HLS video playback
│   │   │   ├── UploadForm/           # Video upload interface
│   │   │   ├── VideoGallery/         # Video grid/list views
│   │   │   └── StreamingPage/        # Video playback page
│   │   ├── context/                  # React context for state (auth, theme)
│   │   ├── utils/                    # API utilities and helpers
│   │   └── App.jsx                   # Root component
│   ├── vite.config.js                # Vite configuration
│   └── tailwind.config.js            # Tailwind CSS configuration
│
└── server/                           # Node.js backend application
    ├── src/
    │   ├── controllers/              # Route handlers and business logic
    │   ├── models/                   # MongoDB schemas and models
    │   ├── routes/                   # API endpoint definitions
    │   ├── utils/                    # Multer config, FFmpeg wrappers
    │   └── index.js                  # Server entry point
    └── uploads/
        └── videos/                   # HLS segment storage
```

## Development Workflow

### Frontend Development

1. Start Vite dev server with HMR:

```bash
cd client
npm run dev
```

2. Make component changes (hot reload is automatic).
3. Use browser DevTools for debugging.
4. Run linter before committing:

```bash
npm run lint
```

### Backend Development

1. Start Node.js server with auto-restart:

```bash
cd server
npm start
```

2. Use MongoDB Compass for database inspection.
3. Test API endpoints with Postman or curl.
4. Check FFmpeg output in server logs.

### Testing Workflow

1. Test video upload with various formats and sizes.
2. Verify HLS streaming across different bitrates.
3. Test media editor tools with different file types.
4. Verify dark/light mode across all components.
5. Test responsive layouts on mobile devices.

## Contributing

Contributions are welcome. Please follow these guidelines:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "feat: description"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a pull request with a detailed description.

## License

This project is open source and available under the MIT License.

## Repository

https://github.com/ANAS727189/MediaHub

## Author

Anas - https://github.com/ANAS727189
