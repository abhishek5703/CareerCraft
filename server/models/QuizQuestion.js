import mongoose from "mongoose";

const quizQuestionSchema = new mongoose.Schema({
  roadmapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roadmap",
    required: true,
  },
  section: {
    type: String,
    required: true, // 🔥 Required for section-wise score tracking
    trim: true,
  },
  question: {
    type: String,
    required: true,
    trim: true,
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: (arr) => arr.length >= 2,
      message: "At least two options are required.",
    },
  },
  answer: {
    type: String,
    required: true,
  },
});

export default mongoose.model("QuizQuestion", quizQuestionSchema);
