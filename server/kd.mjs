import mongoose from "mongoose";
import dotenv from "dotenv";
import Roadmap from "./models/Roadmap.js";

dotenv.config();

const imageMapping = {
  "Web Development": "roadmaps/web-dev.jpg",
  "Data Science": "roadmaps/data-science.jpg",
  "Mobile App Development": "roadmaps/appdev.jpg",
  "UI/UX Design": "roadmaps/uiux-design.webp",
  "Cybersecurity": "roadmaps/cybersecurity.webp",
  "Cloud & DevOps": "roadmaps/cloud-devops.jpg",
  "AI & Machine Learning Engineer": "roadmaps/ai-ml.jpg",
  "Blockchain Developer": "roadmaps/Blockchain.jpg",
  "Game Development": "roadmaps/game-dev.png",
  "Product Management": "roadmaps/product-mangement.jpg",
  "Technical Writing": "roadmaps/tech-writing.png",
  "Developer Relations (DevRel)": "roadmaps/developer-relation.png",
  "Data Engineering": "roadmaps/data-engineer.png"
};

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    for (const [title, imagePath] of Object.entries(imageMapping)) {
      const updated = await Roadmap.findOneAndUpdate(
        { title: { $regex: `^${title.trim()}$`, $options: "i" } },
        { $set: { image: imagePath } },
        { new: true }
      );

      if (updated) {
        console.log(`${title} → ✅ Updated (${updated.image})`);
      } else {
        console.log(`${title} → ⚠️ Not found`);

        // Fallback: try finding loosely with partial match
        const fallback = await Roadmap.findOne({ title: new RegExp(title, "i") });
        if (fallback) {
          console.log(`   🔍 Found close match in DB: "${fallback.title}"`);
        }
      }
    }

    await mongoose.disconnect();
    console.log("\n✅ Done!");
  } catch (err) {
    console.error("❌ Error:", err);
  }
};

run();
