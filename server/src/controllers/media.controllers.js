import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import { Video } from "../models/database.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..", "..");
// console.log("Project root:", projectRoot);
// console.log("Controller __dirname:", __dirname);

export const uploadVideo = async (req, res) => {
  try {
    const videoId = uuidv4();
    const videoPath = req.file.path;
    const baseUploadPath = path.join(projectRoot, "uploads", "videos", videoId);
    const hlsPath = path.join(baseUploadPath, "index.m3u8");
    const thumbnailPath = path.join(baseUploadPath, "thumbnail.jpg");
    const framePath = path.join(baseUploadPath, "frame.jpg");

    // console.log("Base upload path:", baseUploadPath);
    // console.log("HLS path:", hlsPath);


    fs.mkdirSync(baseUploadPath, { recursive: true });

    const ffmpegCommand = `ffmpeg -i "${videoPath}" -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${baseUploadPath}/segment%03d.ts" -y "${hlsPath}"`;
    
    // console.log("Running FFmpeg command:", ffmpegCommand);
    
    exec(ffmpegCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`FFmpeg HLS error: ${error.message}`);
        console.error(`FFmpeg stderr: ${stderr}`);
        return res.status(500).json({ 
          message: "Error converting video to HLS", 
          details: error.message + "\n" + stderr 
        });
      }
      
      // Verifying HLS playlist was created
      if (!fs.existsSync(hlsPath)) {
        console.error("HLS playlist not found after generation:", hlsPath);
        console.error("Directory contents:", fs.readdirSync(baseUploadPath));
        return res.status(500).json({ message: "HLS playlist not generated" });
      }
      
      // console.log("HLS playlist generated successfully:", hlsPath);
      // console.log("Directory contents:", fs.readdirSync(baseUploadPath));

      // Extract frame for thumbnail
      const ffmpegCommandThumbnail = `ffmpeg -i "${videoPath}" -ss 00:00:02 -vframes 1 -y "${framePath}"`;
      
      exec(ffmpegCommandThumbnail, (error, stdout, stderr) => {
        if (error) {
          console.error(`FFmpeg frame extraction error: ${error.message}`);
          console.error(`FFmpeg stderr: ${stderr}`);
          return res.status(500).json({ 
            message: "Error extracting frame", 
            details: error.message + "\n" + stderr 
          });
        }
        
        if (!fs.existsSync(framePath)) {
          console.error("Frame file not found after extraction:", framePath);
          return res.status(500).json({ message: "Frame file not found after extraction" });
        }
        
        console.log("Frame extracted successfully:", framePath);
        sharp(framePath)
          .resize(640, 360)
          .jpeg({ quality: 80 })
          .toFile(thumbnailPath, async (err) => {
            if (err) {
              console.error("Sharp thumbnail processing error:", err);
              return res.status(500).json({ 
                message: "Error processing thumbnail", 
                details: err.message 
              });
            }
            
            if (!fs.existsSync(thumbnailPath)) {
              console.error("Thumbnail file not found after processing:", thumbnailPath);
              return res.status(500).json({ message: "Thumbnail file not found after processing" });
            }
            
            console.log("Thumbnail processed successfully:", thumbnailPath);

            try {
              const newVideo = new Video({
                title: req.file.originalname,
                description: req.body.description || "No description",
                videoPath: `/uploads/videos/${videoId}/index.m3u8`,
                thumbnailPath: `/uploads/videos/${videoId}/thumbnail.jpg`,
                uploaderId: req.body.uploaderId || "anonymous",
              });
              
              console.log("Saving video to database:", newVideo);
              await newVideo.save();

              if (fs.existsSync(videoPath)) {
                fs.unlinkSync(videoPath);
                console.log("Cleaned up original video file");
              }
              if (fs.existsSync(framePath)) {
                fs.unlinkSync(framePath);
                console.log("Cleaned up frame file");
              }

              res.status(200).json({
                message: "Video uploaded successfully",
                video: newVideo,
              });
            } catch (err) {
              console.error("Database save error:", err);
              res.status(500).json({ 
                message: "Error saving video metadata", 
                details: err.message 
              });
            }
          });
      });
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Error uploading video", details: error.message });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (err) {
    console.error("Error fetching videos:", err);
    res.status(500).json({ message: "Error fetching videos" });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (video) {
      res.status(200).json(video);
    } else {
      res.status(404).json({ message: "Video not found" });
    }
  } catch (err) {
    console.error("Error fetching video:", err);
    res.status(500).json({ message: "Error fetching video" });
  }
};

export const checkVideoIntegrity = async (req, res) => {
  try {
    const videos = await Video.find();
    const integrity = [];
    
    for (const video of videos) {
      // Extract video ID from the video path
      const videoId = video.videoPath.split('/')[3]; // /uploads/videos/{videoId}/index.m3u8
      const videoDir = path.join(projectRoot, "uploads", "videos", videoId);
      const hlsFile = path.join(videoDir, "index.m3u8");
      const thumbnailFile = path.join(videoDir, "thumbnail.jpg");
      
      const videoExists = fs.existsSync(hlsFile);
      const thumbnailExists = fs.existsSync(thumbnailFile);
      const dirExists = fs.existsSync(videoDir);
      
      let dirContents = [];
      if (dirExists) {
        try {
          dirContents = fs.readdirSync(videoDir);
        } catch (err) {
          console.error(`Error reading directory ${videoDir}:`, err);
        }
      }
      
      integrity.push({
        videoId: video._id,
        title: video.title,
        videoPath: video.videoPath,
        thumbnailPath: video.thumbnailPath,
        extractedVideoId: videoId,
        dirExists,
        videoExists,
        thumbnailExists,
        dirContents,
        status: videoExists && thumbnailExists ? 'GOOD' : 'MISSING_FILES'
      });
    }
    
    const goodVideos = integrity.filter(v => v.status === 'GOOD').length;
    const brokenVideos = integrity.filter(v => v.status === 'MISSING_FILES').length;
    
    res.status(200).json({
      summary: {
        total: videos.length,
        good: goodVideos,
        broken: brokenVideos
      },
      details: integrity
    });
  } catch (err) {
    console.error("Error checking video integrity:", err);
    res.status(500).json({ message: "Error checking video integrity", details: err.message });
  }
};

export const cleanupOrphanedRecords = async (req, res) => {
  try {
    const videos = await Video.find();
    const orphanedRecords = [];
    
    for (const video of videos) {
      // Extract video ID from the video path
      const videoId = video.videoPath.split('/')[3]; // /uploads/videos/{videoId}/index.m3u8
      const videoDir = path.join(projectRoot, "uploads", "videos", videoId);
      const hlsFile = path.join(videoDir, "index.m3u8");
      
      const videoExists = fs.existsSync(hlsFile);
      
      if (!videoExists) {
        orphanedRecords.push(video);
      }
    }
    
    // Only proceed with deletion if user confirms (you can add a query parameter for confirmation)
    const confirmDelete = req.query.confirm === 'true';
    
    if (confirmDelete) {
      const deletedIds = [];
      for (const orphanedVideo of orphanedRecords) {
        await Video.findByIdAndDelete(orphanedVideo._id);
        deletedIds.push(orphanedVideo._id);
        console.log(`Deleted orphaned record: ${orphanedVideo.title} (${orphanedVideo._id})`);
      }
      
      res.status(200).json({
        message: `Cleaned up ${deletedIds.length} orphaned records`,
        deletedRecords: orphanedRecords.map(v => ({
          id: v._id,
          title: v.title,
          videoPath: v.videoPath
        }))
      });
    } else {
      res.status(200).json({
        message: `Found ${orphanedRecords.length} orphaned records (use ?confirm=true to delete them)`,
        orphanedRecords: orphanedRecords.map(v => ({
          id: v._id,
          title: v.title,
          videoPath: v.videoPath
        }))
      });
    }
  } catch (err) {
    console.error("Error cleaning up orphaned records:", err);
    res.status(500).json({ message: "Error cleaning up orphaned records", details: err.message });
  }
};
