import mongoose from "mongoose";
import dotenv from "dotenv";
import Roadmap from "./models/Roadmap.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const roadmaps = await Roadmap.find({});
    roadmaps.forEach((rm) => {
      console.log(`→ ${rm.title}`);
    });
    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error:", err);
  }
};

run();
