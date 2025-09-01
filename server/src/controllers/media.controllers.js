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

    // Ensure directory exists
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
      
      // Verify HLS playlist was created
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