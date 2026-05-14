## **IMAGE EDITING OPERATIONS - FULL FLOW**

### **Architecture Overview**
The image editing system uses a **client-side transformation approach** with Cloudinary as the media processing backend. All transformations are URL-based, meaning no server-side processing is needed for images.

### **Step-by-Step Flow:**

#### **1. FILE UPLOAD PHASE**
```
User selects image → MediaUploader component → useCloudinaryUpload hook
↓
FormData sent to Cloudinary API (https://api.cloudinary.com/v1_1/{cloud_id}/image/upload)
↓
Cloudinary returns: { secure_url, public_id, width, height, format, ... }
↓
URL stored in state (mediaUrl) for transformation
```

**Code Location**: useCloudinaryUpload.js

---

#### **2. AVAILABLE IMAGE TOOLS & TRANSFORMATIONS**

| Tool | Transformation Method | Cloudinary Parameters |
|------|----------------------|----------------------|
| **Resize** | Dimension-based scaling | `w_800,h_600` (width, height) |
| **Crop** | Area selection cropping | `c_crop,x_100,y_50,w_300,h_300` |
| **Rotate** | Angle-based rotation | `a_45` (angle in degrees) |
| **Compress** | Quality reduction | `q_80` (quality 1-100) |
| **Effects** | Filter/adjustment layers | `e_blur:30`, `e_sepia`, `e_grayscale` |
| **Brightness/Contrast** | Tone adjustments | `e_brightness:50`, `e_contrast:-20` |
| **Saturation** | Color intensity | `e_saturation:50` |
| **Blur** | Gaussian blur | `e_blur:15` |
| **Watermark** | Text/image overlay | `l_text:Arial_50:YourText` |

**Code Location**: EffectsTool.jsx, ResizeTool.jsx

---

#### **3. TRANSFORMATION URL GENERATION PROCESS**

```javascript
// Example transformation chain:
Original URL:
https://res.cloudinary.com/dsk0fzyho/image/upload/v123/file.jpg

Selected Operations:
1. Format: Auto detect → f_auto
2. Width: 800px → w_800
3. Blur: 20 → e_blur:20
4. Brightness: +30 → e_brightness:30

Generated URL:
https://res.cloudinary.com/dsk0fzyho/image/upload/
  f_auto,w_800,e_blur:20,e_brightness:30/v123/file.jpg
             ↑ All transformations chained here
```

**Code Location**: useMediaTransform.js

---

#### **4. REAL-TIME PREVIEW & STATE MANAGEMENT**

```
Tool Control Changes (slider/input) 
    ↓
useEffect detects state change 
    ↓
generateTransformUrl() builds new Cloudinary URL
    ↓
setTransformedUrl() updates preview image
    ↓
User sees transformation in real-time (live preview)
```

**Key Hook Function**:
```javascript
const generateTransformUrl = (mediaUrl, transformations) => {
  // Transforms: ["f_auto", "w_800", "h_600", "e_blur:20"]
  // Joins them: "f_auto,w_800,h_600,e_blur:20"
  // Inserts into URL at /upload/ position
  return `${baseUrl}/upload/${transformationString}/${publicId}`
}
```

---

#### **5. DOWNLOAD PHASE**

```
User clicks "Download"
    ↓
downloadMedia() function fetches transformed image from Cloudinary URL
    ↓
Response converted to Blob
    ↓
Blob URL created → HTML <a> element
    ↓
Automatic download triggered with proper file extension
    ↓
File saved to user's device
```

---

## **FFMPEG USAGE - FULL FLOW**

### **Where FFmpeg is Used:**
FFmpeg is used **only on the backend** for video processing. It's **NOT used** for image editing (that's Cloudinary).

### **Architecture Overview**
```
Video Upload → Multer receives file → FFmpeg processing → HLS output
                                    ↓
                            Database metadata storage
```

---

### **COMPLETE VIDEO UPLOAD & PROCESSING PIPELINE**

#### **Step 1: FILE UPLOAD & VALIDATION**
```
User uploads video file via UploadForm
    ↓
Multer middleware (multer.config.js) validates:
  ✓ File type: MP4, WebM, OGG, AVI, MOV only
  ✓ File size: Max 100MB
    ↓
File saved to: /server/uploads/{fieldname}-{uuid}{ext}
    ↓
Request body contains: { uploaderId, description }
```

**Code Location**: multer.config.js

---

#### **Step 2: HLS CONVERSION (FFmpeg Command 1)**

```bash
ffmpeg -i "input.mp4" 
       -codec:v libx264          # H.264 video codec
       -codec:a aac              # AAC audio codec
       -hls_time 10              # 10-second segments
       -hls_playlist_type vod    # Video On Demand
       -hls_segment_filename "segment%03d.ts"
       "output/index.m3u8"
```

**What happens:**
1. FFmpeg reads input video
2. Encodes video → H.264 (modern, efficient)
3. Encodes audio → AAC (universal)
4. Splits into **10-second segments**: segment000.ts, segment001.ts, etc.
5. Creates master playlist **index.m3u8** containing:
   ```
   #EXTM3U
   #EXT-X-VERSION:3
   #EXT-X-TARGETDURATION:10
   #EXTINF:10.0,
   segment000.ts
   #EXTINF:10.0,
   segment001.ts
   ...
   #EXT-X-ENDLIST
   ```

**Code Location**: media.controllers.js#L28-L65

---

#### **Step 3: THUMBNAIL EXTRACTION (FFmpeg Command 2)**

```bash
ffmpeg -i "input.mp4" 
       -ss 00:00:02           # Start at 2 seconds
       -vframes 1             # Extract 1 frame only
       "frame.jpg"            # Output frame
```

**What happens:**
1. Extracts **first frame at 2-second mark** (avoids black screen at start)
2. Saves as JPG

**Then Sharp (Node.js image library) processes it:**
```javascript
sharp(framePath)
  .resize(640, 360)           // Scale to 640×360
  .jpeg({ quality: 80 })      // Compress with 80% quality
  .toFile(thumbnailPath)      // Save as thumbnail
```

**Code Location**: media.controllers.js#L65-L85

---

#### **Step 4: DURATION EXTRACTION (FFprobe)**

```bash
ffprobe -v error 
        -show_entries format=duration 
        "input.mp4"
# Output: 125.5 (seconds)
```

Converted to readable format and stored in database.

**Code Location**: media.controllers.js#L8-L18

---

#### **Step 5: DATABASE STORAGE**

```javascript
new Video({
  title: "my-video.mp4",
  description: "User's description",
  videoPath: "/uploads/videos/{uuid}/index.m3u8",  // HLS playlist
  thumbnailPath: "/uploads/videos/{uuid}/thumbnail.jpg",
  uploaderId: "clerk-user-id",
  duration: 125,  // seconds
  views: 0,
  uploadDate: new Date()
})
```

**Code Location**: media.controllers.js#L90-L105

---

#### **Step 6: CLEANUP**

```
Original video file → DELETED (no longer needed)
Frame.jpg → DELETED (only thumbnail needed)
HLS segments → KEPT (needed for streaming)
Thumbnail → KEPT (needed for gallery)
```

**Why?** Save storage space - original is no longer needed since we have HLS segments.

---

### **DIRECTORY STRUCTURE AFTER UPLOAD:**

```
/server/uploads/videos/{uuid}/
├── index.m3u8              ← Master playlist (streamed to browser)
├── segment000.ts           ← Video chunk 1 (0-10 seconds)
├── segment001.ts           ← Video chunk 2 (10-20 seconds)
├── segment002.ts           ← Video chunk 3 (20-30 seconds)
├── ...
└── thumbnail.jpg           ← Preview image for gallery
```

**Total Files Generated**: (duration/10) + 1 files (+ metadata in DB)

---

### **VIDEO EDITING ON CLIENT-SIDE**

Similar to images, video editing uses **Cloudinary transformations** at the URL level:

```javascript
// VideoTrimTool.jsx example:
const transformations = [
  "f_auto",
  "so_5",      // Start offset: 5 seconds
  "eo_35"      // End offset: 35 seconds (trim to 30s clip)
];
// Result: Video plays from 5s to 35s without downloading full video
```

**Code Location**: VideoTrimTool.jsx

---

### **COMPLETE DATA FLOW DIAGRAM**

```
┌─────────────────────── IMAGE EDITING FLOW ──────────────────────┐
│                                                                   │
│  User Upload → Cloudinary Upload → Transformation URL → Preview │
│                    ↓                       ↓                      │
│              Returns URL          Multiple operations           │
│                    ↓               chained in URL                │
│              mediaUrl state       Download processed image       │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘

┌──────────────────── VIDEO PROCESSING FLOW ──────────────────────┐
│                                                                   │
│  Upload → Multer → FFmpeg HLS   → index.m3u8 + segments        │
│  File     Validates  Convert        ↓                            │
│           & Stores   Encodes        Database                     │
│                      │              Storage                      │
│                      ↓                                            │
│                 FFmpeg Extract   → thumbnail.jpg                │
│                 Frame @ 2s          ↓                            │
│                      ↓          Sharp Process                    │
│                    Sharp        (resize, compress)              │
│                 (compress, resize)                              │
│                                     ↓                            │
│                            Clean up temp files                  │
│                                     ↓                            │
│                    Ready for HLS streaming!                     │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

---

### **KEY TECHNOLOGIES**

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Image Editing | Cloudinary API | Real-time transformations via URL |
| Image Processing | Sharp.js | Thumbnail compression & resizing |
| Video Conversion | FFmpeg | HLS encoding & format conversion |
| Duration Extraction | FFprobe | Read video metadata |
| File Upload | Multer | Handle multipart form uploads |
| Storage | Local filesystem | videos |
| Metadata | MongoDB + Mongoose | Video records & analytics |

---

This architecture allows **fast image editing** (client-side, instant preview) and **reliable video streaming** (HLS format adapts to network speeds automatically).