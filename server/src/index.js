import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { exec } from "child_process";
import mediaRoutes from "./routes/media.routes.js";

const app = express();
const port = process.env.PORT;

exec('ffmpeg -version', (error, stdout, stderr) => {
  if (error) {
    console.error('FFmpeg is not installed or not accessible:', error);
    process.exit(1);
  } else {
    console.log('FFmpeg is installed and accessible');
  }
});

app.use(cors({ origin: process.env.CLIENT_URI }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/health-123", (req, res) => res.status(200).send("Hello World!"));
app.use("/", mediaRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "An unexpected error occurred!" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});