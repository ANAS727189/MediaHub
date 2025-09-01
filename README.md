<div align="center">

# 🎥 MediaHub

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![FFmpeg](https://img.shields.io/badge/FFmpeg-007808?style=flat&logo=ffmpeg&logoColor=white)](https://ffmpeg.org/)

🚀 **A comprehensive platform for video streaming, media editing, and content management**

[🌟 Features](#features) • [🚀 Quick Start](#quick-start) • [📖 Documentation](#documentation) • [🛠️ Tech Stack](#tech-stack) • [🤝 Contributing](#contributing)

![MediaHub Demo](https://res.cloudinary.com/demo/image/upload/w_800,q_auto,f_auto/mediahub-demo.jpg)

</div>

---

## 🌟 Features

### 🎬 **Video Streaming & Management**
- 📹 **HLS Video Streaming** - Upload and stream videos with adaptive bitrate
- 🖼️ **Smart Thumbnails** - Auto-generated thumbnails with FFmpeg
- 📊 **View Analytics** - Real-time view tracking and engagement metrics
- 🎯 **Video Gallery** - Professional grid and list views with search/filter
- ⏱️ **Duration Detection** - Automatic video length extraction and display

### 🖼️ **Professional Media Editor**
- **🖼️ Image Tools:**
  - ✂️ **Smart Crop** - Interactive cropping with aspect ratio controls
  - 📏 **Resize** - Intelligent resizing with quality preservation
  - 🎨 **Effects** - Filters, brightness, contrast, saturation adjustments
  - 🗜️ **Compression** - Advanced compression with quality controls
  - 🔄 **Rotation** - Precise rotation and flip operations

- **🎥 Video Tools:**
  - ✂️ **Video Trimming** - Precise timeline-based video cutting
  - 🎬 **Video Effects** - Color grading, filters, and visual enhancements
  - � **Audio Management** - Audio track editing and replacement

- **🔄 Format Conversion:**
  - 🖼️ **Image Formats** - Support for JPG, PNG, WebP, AVIF, GIF, TIFF, BMP, ICO
  - 🎥 **Video Formats** - MP4, WebM, AVI, MOV, MKV, FLV, OGV conversion
  - ⚙️ **Quality Control** - Customizable compression and optimization settings

### 🔐 **Authentication & User Management**
- 🔒 **Secure Authentication** - Powered by Clerk with multiple sign-in options
- 👤 **User Profiles** - Personalized user experiences and content management
- �️ **Protected Routes** - Role-based access control for sensitive features

### 🎨 **User Interface & Experience**
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🌓 **Dark/Light Mode** - System-aware theme switching with user preferences
- ⚡ **Modern UI** - Built with Tailwind CSS and Lucide React icons
- � **Interactive Components** - Smooth animations and hover effects
- 🎯 **Intuitive Navigation** - Clean, accessible interface design

### 🛠️ **Developer Experience**
- 🔥 **Hot Module Replacement** - Lightning-fast development with Vite
- 📚 **Comprehensive Documentation** - Built-in docs with interactive examples
- 🐛 **Error Handling** - Robust error boundaries and user feedback
- 📊 **Performance Optimized** - Code splitting and lazy loading

## 🚀 Quick Start

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or later) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **MongoDB** (v5.0 or later) - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local installation
- **FFmpeg** - Required for video processing ([Download here](https://ffmpeg.org/download.html))

### ⚡ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ANAS727189/MediaHub.git
   cd MediaHub
   ```

2. **Install dependencies for both client and server**
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Environment Configuration**
   
   **Client Environment Variables** (create `client/.env`):
   ```env
   VITE_BACKEND_URI=http://localhost:8000
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```

   **Server Environment Variables** (create `server/.env`):
   ```env
   PORT=8000
   DATABASE_URI=mongodb://localhost:27017/mediahub
   CLIENT_URI=http://localhost:5173
   ```

4. **Start the development servers**
   ```bash
   # Terminal 1 - Start the backend server
   cd server
   npm start

   # Terminal 2 - Start the frontend client  
   cd client
   npm run dev
   ```

5. **Access the application**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:8000](http://localhost:8000)

## � Documentation

### 🎯 Core Features

| Feature | Description | Status |
|---------|-------------|--------|
| 🏠 **Landing Page** | Modern hero section with feature showcase | ✅ Complete |
| 📺 **Video Streaming** | HLS streaming with professional video player | ✅ Complete |
| 🖼️ **Media Editor** | Comprehensive image and video editing tools | ✅ Complete |
| 🔄 **Format Conversion** | Multi-format image and video conversion | ✅ Complete |
| � **Documentation** | Interactive documentation with examples | ✅ Complete |
| 🔐 **Authentication** | Secure user management with Clerk | ✅ Complete |

### 🎨 Media Editor Tools

#### Image Editing Tools
- **Resize Tool** - Intelligent resizing with aspect ratio preservation
- **Crop Tool** - Interactive cropping with preset ratios
- **Effects Tool** - Brightness, contrast, saturation, and filter adjustments
- **Compression Tool** - Smart compression with quality control
- **Rotation Tool** - Precise rotation and flip operations

#### Video Editing Tools  
- **Trim Tool** - Timeline-based video trimming and cutting
- **Effects Tool** - Color grading and visual enhancements
- **Audio Tool** - Audio track management and replacement

#### Format Conversion
- **Image Formats**: JPG, PNG, WebP, AVIF, GIF, TIFF, BMP, ICO
- **Video Formats**: MP4, WebM, AVI, MOV, MKV, FLV, OGV
- **Quality Control**: Customizable compression and optimization

### 🛠️ API Documentation

#### Video Management Endpoints

```javascript
// Get all videos
GET /api/videos
Response: Array of video objects with metadata

// Get specific video  
GET /api/videos/:id
Response: Video object with full details

// Upload new video
POST /api/upload
Body: FormData with video file
Response: Uploaded video with HLS segments

// Increment view count
POST /api/videos/:id/view  
Response: Updated video with new view count
```

#### Video Object Structure

```javascript
{
  _id: "unique_video_id",
  title: "Video Title", 
  description: "Video Description",
  videoPath: "/uploads/videos/uuid/index.m3u8",
  thumbnailPath: "/uploads/videos/uuid/thumbnail.jpg",
  duration: "5:23", // MM:SS format
  views: 1250, // Real-time view count
  uploadDate: "2025-01-01T00:00:00.000Z",
  metadata: {
    width: 1920,
    height: 1080, 
    fileSize: 15728640, // bytes
    bitrate: 2500000 // bits per second
  }
}
```

## 🛠️ Tech Stack

### Frontend
- **⚛️ React 18** - Modern React with hooks and concurrent features
- **🛣️ React Router** - Client-side routing and navigation
- **🎨 Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **⚡ Vite** - Lightning-fast build tool and dev server
- **🌟 Lucide React** - Beautiful, customizable icons
- **🖼️ React Image Crop** - Interactive image cropping component
- **🎬 Video.js** - Professional HTML5 video player
- **📱 React Toastify** - Elegant notification system

### Backend
- **🟢 Node.js** - JavaScript runtime for server-side development
- **🚀 Express.js** - Fast, unopinionated web framework
- **🍃 MongoDB** - NoSQL database for flexible data storage
- **🍃 Mongoose** - MongoDB object modeling for Node.js
- **📤 Multer** - Multipart/form-data handling for file uploads
- **🎥 FFmpeg** - Video processing and conversion
- **🖼️ Sharp** - High-performance image processing
- **☁️ Cloudinary** - Cloud-based image and video management

### Authentication & Security
- **🔐 Clerk** - Complete user management and authentication
- **🛡️ CORS** - Cross-origin resource sharing security
- **🔒 Private Routes** - Protected route components

### Development & Deployment
- **📦 npm/yarn** - Package management
- **🔄 Hot Module Replacement** - Instant development feedback
- **🐳 Docker** - Containerization support
- **☁️ Render** - Cloud deployment platform

### Database Schema

```javascript
// Video Schema
const videoSchema = {
  title: String,
  description: String,
  videoPath: String,        // HLS playlist path
  thumbnailPath: String,    // Auto-generated thumbnail
  uploaderId: String,       // Clerk user ID
  uploadDate: Date,         // Auto-generated timestamp
  duration: String,         // MM:SS format from FFprobe
  views: Number,            // Real-time view tracking
  metadata: {
    width: Number,          // Video resolution width
    height: Number,         // Video resolution height  
    fileSize: Number,       // File size in bytes
    bitrate: Number         // Bitrate in bits/second
  }
}
```

## 🔧 Configuration

### Required Services Setup

#### 1. MongoDB Setup
```bash
# Local MongoDB (recommended for development)
brew install mongodb/brew/mongodb-community
brew services start mongodb/brew/mongodb-community

# Or use MongoDB Atlas (recommended for production)
# Sign up at https://www.mongodb.com/cloud/atlas
```

#### 2. Cloudinary Setup
```bash
# Sign up at https://cloudinary.com
# Get your credentials from the dashboard
# Add to your .env files
```

#### 3. Clerk Authentication Setup
```bash
# Sign up at https://clerk.dev
# Create a new application
# Get your publishable key from the dashboard
```

#### 4. FFmpeg Installation
```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt update && sudo apt install ffmpeg

# Windows
# Download from https://ffmpeg.org/download.html
```

### 🚀 Deployment

#### Deploy to Render (Recommended)

1. **Backend Deployment**
   ```bash
   # Push code to GitHub
   # Connect Render to your GitHub repository
   # Set environment variables in Render dashboard
   # Deploy from server/ directory
   ```

2. **Frontend Deployment**  
   ```bash
   # Build the client
   cd client && npm run build
   
   # Deploy to Render static site
   # Or use Vercel, Netlify for frontend hosting
   ```

#### Environment Variables for Production
```env
# Server Production Variables
NODE_ENV=production
PORT=10000
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/mediahub
CLIENT_URI=https://your-frontend-domain.com

# Client Production Variables  
VITE_BACKEND_URI=https://your-backend-domain.com
VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_clerk_key
```

## 🤝 Contributing

We welcome contributions! Here's how you can help improve MediaHub:

### 🐛 Bug Reports
1. Check existing [issues](https://github.com/ANAS727189/MediaHub/issues)
2. Create a new issue with detailed reproduction steps
3. Include screenshots/videos if applicable

### 💡 Feature Requests
1. Check [discussions](https://github.com/ANAS727189/MediaHub/discussions) for existing requests
2. Create a detailed feature request with use cases
3. Consider contributing the implementation

### 🔧 Code Contributions
1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/MediaHub.git
   cd MediaHub
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow existing code style and conventions
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   ```bash
   # Run client tests
   cd client && npm run lint
   
   # Test server functionality
   cd server && npm start
   ```

5. **Commit and push**
   ```bash
   git commit -m "feat: add amazing new feature"
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Provide clear description of changes
   - Include screenshots/GIFs for UI changes
   - Reference related issues

### 📝 Documentation
- Help improve README, code comments, and documentation
- Create tutorials or example projects
- Report documentation bugs or inconsistencies

### 🎨 Design Contributions
- UI/UX improvements and suggestions
- Icon and graphic contributions
- Accessibility enhancements

<div align="center">

**🌍 Live Demo**: [https://media-hub-xi.vercel.app](https://media-hub-xi.vercel.app)

**Made with ❤️ by [Anas](https://github.com/ANAS727189)**

[⬆ Back to Top](#mediahub) | [🌟 Give it a Star!](https://github.com/ANAS727189/MediaHub)

**If you found this project helpful, please consider giving it a ⭐!**

</div>
