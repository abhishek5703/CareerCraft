import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  updateProgress,
  getProgressForLoggedInUser, // ✅ renamed
} from "../controllers/progressController.js";

import { getAllRoadmapProgressForUser } from "../controllers/progressController.js";

const router = express.Router();

// ✅ Update progress route (secure)
router.post("/update", requireAuth, updateProgress);

// ✅ New secure route to get progress for logged-in user
router.get("/:roadmapId", requireAuth, getProgressForLoggedInUser);

router.get("/user/:userId/roadmaps", requireAuth, getAllRoadmapProgressForUser);

export default router;
