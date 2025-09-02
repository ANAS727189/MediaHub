import express from "express";
import upload from "../utils/multer.config.js";
import { getAllVideos, getVideoById, uploadVideo, checkVideoIntegrity, cleanupOrphanedRecords } from "../controllers/media.controllers.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadVideo);
router.get("/videos", getAllVideos);
router.get("/videos/:id", getVideoById);
router.get("/check-integrity", checkVideoIntegrity);
router.delete("/cleanup-orphaned", cleanupOrphanedRecords);

export default router;