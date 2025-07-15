// controllers/quizController.js
import QuizQuestion from "../models/QuizQuestion.js";
import QuizResult from "../models/QuizResult.js";

export const getQuizQuestions = async (req, res) => {
  try {
    const questions = await QuizQuestion.find({ roadmapId: req.params.roadmapId });

    if (!questions.length) {
      return res.status(404).json({ error: "No quiz found for this roadmap" });
    }

    res.json(questions);
  } catch (err) {
    console.error("Error loading questions:", err);
    res.status(500).json({ error: "Failed to load questions" });
  }
};

export const submitQuizResult = async (req, res) => {
  try {
    const { userId, roadmapId, score, total, sectionScores } = req.body;

    if (!userId || !roadmapId || typeof score !== "number" || typeof total !== "number") {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = new QuizResult({
      userId,
      roadmapId,
      score,
      total,
      sectionScores,
    });

    await result.save();
    res.status(200).json({ message: "Result saved successfully" });
  } catch (err) {
    console.error("Error saving result:", err);
    res.status(500).json({ error: "Failed to save result" });
  }
};

export const getUserQuizResults = async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.params.userId })
      .populate("roadmapId", "title")
      .sort({ createdAt: -1 });

    res.json(results);
  } catch (err) {
    console.error("Error fetching results:", err);
    res.status(500).json({ error: "Failed to fetch results" });
  }
};
