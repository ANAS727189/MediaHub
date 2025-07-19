import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get project root - assuming multer.config.js is in src/config or similar
const projectRoot = path.resolve(__dirname, "..", "..");
const uploadsPath = path.join(projectRoot, "uploads");

console.log("Multer config - Project root:", projectRoot);
console.log("Multer config - Uploads path:", uploadsPath);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure uploads directory exists
    if (!fs.existsSync(uploadsPath)) {
      fs.mkdirSync(uploadsPath, { recursive: true });
      console.log("Created uploads directory:", uploadsPath);
    }
    console.log("Multer destination:", uploadsPath);
    cb(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    const filename = `${file.fieldname}-${uuidv4()}${path.extname(file.originalname)}`;
    console.log("Multer filename:", filename);
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: (req, file, cb) => {
    console.log("File filter - mimetype:", file.mimetype);
    const allowedTypes = ["video/mp4", "video/webm", "video/ogg", "video/avi", "video/mov"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type: ${file.mimetype}. Only MP4, WebM, OGG, AVI, and MOV videos are allowed.`));
    }
  },
});

export default upload;