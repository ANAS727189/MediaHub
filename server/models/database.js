import mongoose from "mongoose";

mongoose.connect("mongodb+srv://anas:anaskhan083@media-hub.2jmlf.mongodb.net/?retryWrites=true&w=majority&appName=media-hub")
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
