import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { chatWithAI, streamChatWithAI } from "../controllers/aiController.js";

const router = express.Router();

router.post("/chat", requireAuth, chatWithAI);
router.post("/chat/stream", requireAuth, streamChatWithAI);

export default router;
