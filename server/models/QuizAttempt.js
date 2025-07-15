import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  roadmapId: { type: mongoose.Schema.Types.ObjectId, ref: "Roadmap", required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  attemptedAt: { type: Date, default: Date.now },
});

export default mongoose.model("QuizAttempt", quizAttemptSchema);
