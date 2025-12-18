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

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://career-craft-two.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// MongoDB connection (cached)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("MongoDB connected");
}

// Health check
app.get("/", async (req, res) => {
  await connectDB();
  res.send("CareerCraft Backend is running");
});

// Routes
app.use("/api/roadmaps", async (req, res, next) => {
  await connectDB();
  next();
}, roadmapRoutes);

app.use("/api/auth", async (req, res, next) => {
  await connectDB();
  next();
}, authRoutes);

app.get("/api/protected", requireAuth, async (req, res) => {
  await connectDB();
  res.send(`Hello ${req.user.id}, this is a protected route.`);
});

app.use("/api/progress", async (req, res, next) => {
  await connectDB();
  next();
}, progressRoutes);

app.use("/api/quiz", async (req, res, next) => {
  await connectDB();
  next();
}, quizRoutes);

export default app;
