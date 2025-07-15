import mongoose from "mongoose";

const stepSchema = new mongoose.Schema({
  title: String,
  description: String,
  resources: [String],
});

const sectionSchema = new mongoose.Schema({
  title: String,
  steps: [stepSchema],
});

const roadmapSchema = new mongoose.Schema({
  title: String,
  category: String,
  sections: [sectionSchema],
  image: String, // ✅ added for storing image path
});

export default mongoose.model("Roadmap", roadmapSchema);
