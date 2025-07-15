import UserProgress from "../models/UserProgress.js";  // <-- import the model

// updateProgress
export const updateProgress = async (req, res) => {
  const { roadmapId, completedSteps } = req.body;
  const userId = req.user.id;

  try {
    const progress = await UserProgress.findOneAndUpdate(
      { userId, roadmapId },
      { completedSteps },
      { new: true, upsert: true }
    );

    res.json(progress);
  } catch (err) {
    console.error("Error updating progress:", err);
    res.status(500).json({ error: "Failed to update progress" });
  }
};

// getProgressForLoggedInUser (fix)
export const getProgressForLoggedInUser = async (req, res) => {
  const userId = req.user.id;
  const { roadmapId } = req.params;

  try {
    const progress = await UserProgress.findOne({ userId, roadmapId });

    if (!progress) {
      return res.json({ completedSteps: [] });
    }

    // ✅ Return only the data needed
    res.json({ completedSteps: progress.completedSteps });
  } catch (err) {
    console.error("Error fetching progress:", err);
    res.status(500).json({ error: "Error fetching progress" });
  }
};

