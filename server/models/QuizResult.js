import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  roadmapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roadmap",
    required: true,
  },
  score: Number,
  total: Number,
  sectionScores: [
    {
      section: { type: String, required: true },
      correct: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("QuizResult", quizResultSchema);
