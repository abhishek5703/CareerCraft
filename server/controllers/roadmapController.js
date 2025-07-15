import Roadmap from "../models/Roadmap.js";

// GET: All Roadmaps (basic list for dashboard)
export const getAllRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({}, "title category"); // Only return basic info
    res.json(roadmaps);
  } catch (error) {
    console.error("Error fetching roadmaps:", error);
    res.status(500).json({ message: "Failed to fetch roadmaps" });
  }
};

// GET: Specific Roadmap by ID (with sections and steps)
export const getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    // If roadmap has sections (new format), return as-is
    if (roadmap.sections && roadmap.sections.length > 0) {
      return res.json(roadmap);
    }

    // Optional fallback: if using old "steps" format
    if (roadmap.steps && roadmap.steps.length > 0) {
      const converted = {
        _id: roadmap._id,
        title: roadmap.title,
        category: roadmap.category,
        sections: [
          {
            title: "General",
            steps: roadmap.steps
          }
        ]
      };
      return res.json(converted);
    }

    // No content found
    res.status(200).json({ message: "This roadmap has no content yet." });

  } catch (error) {
    console.error("Error fetching roadmap by ID:", error);
    res.status(500).json({ message: "Failed to fetch roadmap" });
  }
};
