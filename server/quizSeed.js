import mongoose from "mongoose";
import dotenv from "dotenv";
import QuizQuestion from "./models/QuizQuestion.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log("✅ Connected to MongoDB");

const roadmapId = "6874e356c45a3e21b1dea1d6"; // Replace with your roadmap ID

const questions = [
  // 🟦 FRONTEND
  {
    roadmapId,
    section: "Frontend",
    question: "Which HTML tag is used to insert an image?",
    options: ["<img>", "<image>", "<src>", "<picture>"],
    answer: "<img>",
  },
  {
    roadmapId,
    section: "Frontend",
    question: "Which CSS layout system uses 'justify-content' and 'align-items'?",
    options: ["Flexbox", "Grid", "Box Model", "Inline-block"],
    answer: "Flexbox",
  },
  {
    roadmapId,
    section: "Frontend",
    question: "Which method is used in JavaScript to select an element by ID?",
    options: ["getElementById()", "querySelector()", "getById()", "selectById()"],
    answer: "getElementById()",
  },
  {
    roadmapId,
    section: "Frontend",
    question: "What does JSX stand for in React?",
    options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JavaScript XHTML"],
    answer: "JavaScript XML",
  },
  {
    roadmapId,
    section: "Frontend",
    question: "Which hook is used for managing component state in React?",
    options: ["useState", "useEffect", "useRef", "useMemo"],
    answer: "useState",
  },

  // 🟦 BACKEND
  {
    roadmapId,
    section: "Backend",
    question: "Which command initializes a Node.js project?",
    options: ["npm init", "node init", "npm install", "node create"],
    answer: "npm init",
  },
  {
    roadmapId,
    section: "Backend",
    question: "Which middleware is commonly used in Express to parse JSON?",
    options: ["express.json()", "bodyParser()", "jsonParser()", "express.parser()"],
    answer: "express.json()",
  },
  {
    roadmapId,
    section: "Backend",
    question: "Which database uses collections and documents?",
    options: ["MongoDB", "MySQL", "PostgreSQL", "Oracle"],
    answer: "MongoDB",
  },
  {
    roadmapId,
    section: "Backend",
    question: "What does JWT stand for?",
    options: ["JSON Web Token", "Java Web Token", "JavaScript Web Tool", "None of the above"],
    answer: "JSON Web Token",
  },
  {
    roadmapId,
    section: "Backend",
    question: "Which HTTP status code indicates 'Unauthorized'?",
    options: ["401", "403", "500", "404"],
    answer: "401",
  },

  // 🟦 APIs
  {
    roadmapId,
    section: "APIs",
    question: "Which tool is commonly used to test REST APIs?",
    options: ["Postman", "Photoshop", "MongoDB Compass", "Webpack"],
    answer: "Postman",
  },
  {
    roadmapId,
    section: "APIs",
    question: "In REST, which HTTP method is used to delete data?",
    options: ["DELETE", "REMOVE", "DEL", "POST"],
    answer: "DELETE",
  },
  {
    roadmapId,
    section: "APIs",
    question: "Which format is primarily used for GraphQL queries?",
    options: ["JSON-like structure", "XML", "HTML", "CSV"],
    answer: "JSON-like structure",
  },
  {
    roadmapId,
    section: "APIs",
    question: "What is the purpose of Axios in frontend development?",
    options: ["To make HTTP requests", "To handle routing", "To manage state", "To write tests"],
    answer: "To make HTTP requests",
  },

  // 🟦 VERSION CONTROL
  {
    roadmapId,
    section: "Version Control",
    question: "Which Git command stages all changes for commit?",
    options: ["git add .", "git stage all", "git commit -a", "git init"],
    answer: "git add .",
  },
  {
    roadmapId,
    section: "Version Control",
    question: "Which Git command shows the commit history?",
    options: ["git log", "git history", "git commits", "git track"],
    answer: "git log",
  },

  // 🟦 DEVOPS & DEPLOYMENT
  {
    roadmapId,
    section: "DevOps & Deployment",
    question: "Which platform is popular for frontend deployment?",
    options: ["Netlify", "MongoDB Atlas", "Postman", "Figma"],
    answer: "Netlify",
  },
  {
    roadmapId,
    section: "DevOps & Deployment",
    question: "What does CI/CD mean in DevOps?",
    options: ["Continuous Integration / Continuous Delivery", "Code Integration / Code Deployment", "Central Input / Code Data", "None of the above"],
    answer: "Continuous Integration / Continuous Delivery",
  },
  {
    roadmapId,
    section: "DevOps & Deployment",
    question: "Which platform can be used to deploy a Node.js app?",
    options: ["Render", "Figma", "VS Code", "React DevTools"],
    answer: "Render",
  },

  // 🟦 TESTING
  {
    roadmapId,
    section: "Testing",
    question: "Which tool is commonly used for React unit testing?",
    options: ["Jest", "Webpack", "Axios", "MongoDB"],
    answer: "Jest",
  },
  {
    roadmapId,
    section: "Testing",
    question: "What is the purpose of integration testing?",
    options: ["To test how components interact", "To test UI only", "To deploy code", "To manage API keys"],
    answer: "To test how components interact",
  },

  // 🟦 BEST PRACTICES
  {
    roadmapId,
    section: "Best Practices",
    question: "What is the purpose of 'alt' attribute in images?",
    options: ["Accessibility and SEO", "Resize images", "Change color", "Align image"],
    answer: "Accessibility and SEO",
  },
  {
    roadmapId,
    section: "Best Practices",
    question: "Which concept helps prevent XSS and CSRF?",
    options: ["Web security best practices", "CSS modules", "Package managers", "Event bubbling"],
    answer: "Web security best practices",
  },
  {
    roadmapId,
    section: "Best Practices",
    question: "What is the benefit of lazy loading?",
    options: ["Improves initial page load speed", "Improves animations", "Increases file size", "Disables caching"],
    answer: "Improves initial page load speed",
  }
];

let inserted = 0;
let updated = 0;

for (const q of questions) {
  const existing = await QuizQuestion.findOne({ roadmapId: q.roadmapId, question: q.question });

  if (existing) {
    // Update options and answer if changed
    existing.options = q.options;
    existing.answer = q.answer;
    existing.section = q.section; // Optional: also update section
    await existing.save();
    updated++;
    console.log(`🔁 Updated: ${q.question}`);
  } else {
    await QuizQuestion.create(q);
    inserted++;
    console.log(`✅ Inserted: ${q.question}`);
  }
}

console.log(`🎯 Operation complete. Inserted: ${inserted}, Updated: ${updated}`);
process.exit();
