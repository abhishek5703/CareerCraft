import Roadmap from "../models/Roadmap.js";
import { recommendResources } from "../utils/resourceCatalog.js";

const enrichRoadmap = (roadmap) => {
  const json = roadmap.toObject ? roadmap.toObject() : roadmap;
  return {
    ...json,
    sections: (json.sections || []).map((section) => ({
      ...section,
      steps: (section.steps || []).map((step) => ({
        ...step,
        smartResources: recommendResources({ title: step.title, description: step.description, category: json.category, existing: step.resources }),
      })),
    })),
  };
};
export const getAllRoadmaps = async (req, res) => {
  try { res.json(await Roadmap.find({}, "title category image description")); }
  catch { res.status(500).json({ message: "Failed to fetch roadmaps" }); }
};
export const getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);
    if (!roadmap) return res.status(404).json({ message: "Roadmap not found" });
    if (roadmap.sections?.length) return res.json(enrichRoadmap(roadmap));
    if (roadmap.steps?.length) return res.json(enrichRoadmap({ _id: roadmap._id, title: roadmap.title, category: roadmap.category, description: roadmap.description, sections: [{ title: "General", steps: roadmap.steps }] }));
    res.status(200).json({ message: "This roadmap has no content yet." });
  } catch { res.status(500).json({ message: "Failed to fetch roadmap" }); }
};
