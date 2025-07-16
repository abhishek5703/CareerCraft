import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { requireAuth } from "./middleware/authMiddleware.js";
import progressRoutes from "./routes/progressRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://career-craft-zwhr.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("CareerCraft Backend is running ");
});

// API Routes
app.use("/api/roadmaps", roadmapRoutes);

app.use("/api/auth", authRoutes);

app.get("/api/protected", requireAuth, (req, res) => {
  res.send(`Hello ${req.user.id}, this is a protected route.`);
});

app.use("/api/progress", progressRoutes);

app.use("/api/quiz", quizRoutes);

// MongoDB connection + start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
