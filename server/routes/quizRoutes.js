import express from "express";
import {
  getQuizQuestions,
  submitQuizResult,
  getUserQuizResults,
  submitQuiz,
  getQuizAttempts,
  getUserRoadmapAttempts,
} from "../controllers/quizController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Place this route ABOVE ":roadmapId"
router.get("/:roadmapId/attempts", requireAuth, getQuizAttempts);

// ✅ Get quiz questions
router.get("/:roadmapId", requireAuth, getQuizQuestions);

// Save result with section breakdown
router.post("/save-result", requireAuth, submitQuizResult);

// All results for a user
router.get("/results/:userId", requireAuth, getUserQuizResults);

// Submit a quiz attempt
router.post("/submit", requireAuth, submitQuiz);

// All roadmaps with attempts for this user
router.get("/user/:userId/roadmaps", requireAuth, getUserRoadmapAttempts);

export default router;
