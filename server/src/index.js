import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { exec } from "child_process";
import mediaRoutes from "./routes/media.routes.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;


exec('ffmpeg -version', (error, stdout, stderr) => {
  if (error) {
    console.error('FFmpeg is not installed or not accessible:', error);
    process.exit(1);
  } else {
    console.log('FFmpeg is installed and accessible');
  }
});

const corsOptions = {
  origin: process.env.CLIENT_URI || ['http://localhost:5173'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());


const projectRoot = path.resolve(__dirname, ".."); 
const uploadsPath = path.join(projectRoot, "uploads");
// console.log("Project root:", projectRoot);
// console.log("Uploads path for static serving:", uploadsPath);
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
  console.log("Created uploads directory:", uploadsPath);
}


app.use("/uploads", express.static(uploadsPath, {
  setHeaders: (res, path) => {
    if (path.endsWith('.m3u8')) {
      res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
      res.setHeader('Access-Control-Allow-Origin', '*');
    } else if (path.endsWith('.ts')) {
      res.setHeader('Content-Type', 'video/mp2t');
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
  }
}));



app.get('/test-file/:videoId', (req, res) => {
  const { videoId } = req.params;
  const filePath = path.join(uploadsPath, 'videos', videoId, 'index.m3u8');
  
  // console.log('Checking file:', filePath);
  // console.log('File exists:', fs.existsSync(filePath));
  
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    res.json({
      exists: true,
      size: stats.size,
      path: filePath,
      contents: fs.readFileSync(filePath, 'utf8').substring(0, 200)
    });
  } else {
    const dirPath = path.join(uploadsPath, 'videos', videoId);
    const dirExists = fs.existsSync(dirPath);
    const contents = dirExists ? fs.readdirSync(dirPath) : [];
    
    res.json({
      exists: false,
      path: filePath,
      dirExists,
      dirContents: contents
    });
  }
});

app.get("/health-123", (req, res) => res.status(200).send("Hello World!"));
app.use("/", mediaRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "An unexpected error occurred!" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  // console.log(`Uploads directory: ${uploadsPath}`);
  // console.log(`CORS origins: ${JSON.stringify(corsOptions.origin)}`);
});