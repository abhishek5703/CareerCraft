import QuizQuestion from "../models/QuizQuestion.js";
import QuizResult from "../models/QuizResult.js";
import QuizAttempt from "../models/QuizAttempt.js";

// ✅ Get quiz questions for a roadmap
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

// ✅ Save main quiz result (with section scores)
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

// ✅ Fetch all quiz results for a user
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

// ✅ Save quiz attempt (for history tracking)
export const submitQuiz = async (req, res) => {
  const { roadmapId, score, total } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized user" });
  }

  try {
    const attempt = new QuizAttempt({ userId, roadmapId, score, total });
    await attempt.save();

    res.status(200).json({ message: "Quiz submitted", attempt });
  } catch (err) {
    console.error("Error saving quiz attempt:", err);
    res.status(500).json({ message: "Error saving quiz attempt" });
  }
};

// ✅ Get quiz attempt history for roadmap + user
export const getQuizAttempts = async (req, res) => {
  const { roadmapId } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized user" });
  }

  try {
    const attempts = await QuizAttempt.find({ userId, roadmapId }).sort({ attemptedAt: -1 });

    if (!attempts.length) {
      return res.status(404).json({ message: "No attempts found." });
    }

    res.status(200).json(attempts);
  } catch (err) {
    console.error("Error fetching attempts:", err);
    res.status(500).json({ message: "Error fetching attempts" });
  }
};


export const getUserRoadmapAttempts = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("🚀 Fetching roadmap attempts for userId:", userId); // NEW

    const attempts = await QuizAttempt.find({ userId })
      .sort({ attemptedAt: -1 })
      .populate("roadmapId", "title");

    console.log("📊 Raw attempts found:", attempts.length); // NEW
    console.log("📊 Sample attempt:", attempts[0]); // NEW

    const grouped = {};
    attempts.forEach((attempt) => {
      const roadmapId = attempt.roadmapId?._id?.toString() || attempt.roadmapId;
      const title = attempt.roadmapId?.title || "Unknown Roadmap";

      if (!grouped[roadmapId]) {
        grouped[roadmapId] = { roadmapId, title, attempts: [] };
      }

      grouped[roadmapId].attempts.push({
        score: attempt.score,
        total: attempt.total,
        attemptedAt: attempt.attemptedAt,
      });
    });

    console.log("✅ Grouped:", Object.values(grouped)); // NEW
    res.status(200).json(Object.values(grouped));
  } catch (err) {
    console.error("❌ Error in getUserRoadmapAttempts:", err);
    res.status(500).json({ error: "Failed to fetch roadmap-wise attempts" });
  }
};
