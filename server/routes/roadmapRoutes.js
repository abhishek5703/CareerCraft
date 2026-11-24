
import express from "express";
import { getAllRoadmaps, getRoadmapById } from "../controllers/roadmapController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// The roadmap catalogue contains public discovery content. Keep listing public
// so the Explore page and navbar search can load before a user signs in.
router.get("/", getAllRoadmaps);

// Full roadmap content remains behind authentication.
router.get("/:id", requireAuth, getRoadmapById);

export default router;
