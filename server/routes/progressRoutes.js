import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  updateProgress,
  getProgressForLoggedInUser, 
} from "../controllers/progressController.js";

import { getAllRoadmapProgressForUser } from "../controllers/progressController.js";

const router = express.Router();

// Update progress route (secure)
router.post("/update", requireAuth, updateProgress);

// More specific route FIRST
router.get("/user/:userId/roadmaps", requireAuth, getAllRoadmapProgressForUser);

// Then the generic one
router.get("/:roadmapId", requireAuth, getProgressForLoggedInUser);


export default router;
