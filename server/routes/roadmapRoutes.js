import express from "express";
import { getAllRoadmaps, getRoadmapById } from "../controllers/roadmapController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all roadmaps
router.get("/", requireAuth, getAllRoadmaps);

// Add this route to get a specific roadmap by ID
router.get("/:id", requireAuth, getRoadmapById);

export default router;
