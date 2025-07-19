import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(`${process.env.DATABASE_URI}`)
  .then(() => console.log("Database connected"))
  .catch(err => console.log("Database connection failed", err));

const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    videoPath: String,
    thumbnailPath: String,
    uploaderId: String,
    uploadDate: { type: Date, default: Date.now },
});
export const Video = mongoose.model("Video", videoSchema);
