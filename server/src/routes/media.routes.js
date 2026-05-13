import express from "express";
import upload from "../utils/multer.config.js";
import { getAllVideos, getVideoById, uploadVideo, checkVideoIntegrity, cleanupOrphanedRecords, deleteVideo } from "../controllers/media.controllers.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadVideo);
router.get("/videos", getAllVideos);
router.get("/videos/:id", getVideoById);
router.delete("/videos/:id", deleteVideo);
router.get("/check-integrity", checkVideoIntegrity);
router.delete("/cleanup-orphaned", cleanupOrphanedRecords);

export default router;