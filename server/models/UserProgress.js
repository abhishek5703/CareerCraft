import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
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
  completedSteps: {
    type: [String],  
    default: [],
  },
}, {
  timestamps: true,
});

const UserProgress = mongoose.model("UserProgress", userProgressSchema);
export default UserProgress;
