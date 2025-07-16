import express from "express";
import {
  getQuizQuestions,
  submitQuiz,
  getQuizAttempts,
  getUserRoadmapAttempts,
} from "../controllers/quizController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get quiz attempt history for specific roadmap
router.get("/:roadmapId/attempts", requireAuth, getQuizAttempts);

// Get quiz questions for roadmap
router.get("/:roadmapId", requireAuth, getQuizQuestions);

// Submit a quiz attempt
router.post("/submit", requireAuth, submitQuiz);

// Get roadmap-wise attempts for user
router.get("/user/:userId/roadmaps", requireAuth, getUserRoadmapAttempts);

export default router;
