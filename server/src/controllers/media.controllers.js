import fs from "fs";
import { exec } from "child_process";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import { Video } from "../models/database.js";

export const uploadVideo = async (req, res) => {
  try {
    const videoId = uuidv4();
    const videoPath = req.file.path;
    const outputPath = `../uploads/videos/${videoId}`;
    const hlsPath = `${outputPath}/index.m3u8`;
    const thumbnailPath = `${outputPath}/thumbnail.jpg`;
    const framePath = `${outputPath}/frame.jpg`;

    fs.mkdirSync(outputPath, { recursive: true });

    const ffmpegCommand = `ffmpeg -i ${videoPath} \
      -codec:v libx264 -codec:a aac \
      -hls_time 10 -hls_playlist_type vod \
      -hls_segment_filename "${outputPath}/segment%03d.ts" \
      ${hlsPath}`;

    exec(ffmpegCommand, (error) => {
      if (error) {
        console.error(`FFmpeg HLS error: ${error.message}`);
        return res.status(500).json({ message: "Error converting video to HLS" });
      }

      const ffmpegCommandThumbnail = `ffmpeg -i ${videoPath} -ss 00:00:02 -vframes 1 ${framePath}`;

      exec(ffmpegCommandThumbnail, (error) => {
        if (error) {
          console.error(`FFmpeg frame extraction error: ${error.message}`);
          return res.status(500).json({ message: "Error extracting frame" });
        }

        sharp(framePath)
          .resize(640, 360)
          .toFile(thumbnailPath, async (err) => {
            if (err) {
              console.error("Sharp thumbnail processing error:", err);
              return res.status(500).json({ message: "Error processing thumbnail" });
            }

            try {
              const newVideo = new Video({
                title: req.file.originalname,
                description: req.body.description || "No description",
                videoPath: `../uploads/videos/${videoId}/index.m3u8`,
                thumbnailPath: `../uploads/videos/${videoId}/thumbnail.jpg`,
                uploaderId: req.body.uploaderId,
              });
              await newVideo.save();

              res.status(200).json({
                message: "Video uploaded successfully",
                video: newVideo,
              });
            } catch (err) {
              console.error("Database save error:", err);
              res.status(500).json({ message: "Error saving video metadata" });
            }
          });
      });
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Error uploading video" });
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