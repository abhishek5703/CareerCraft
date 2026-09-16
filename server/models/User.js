import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: null },
    firebaseUid: { type: String, default: null, index: true },
    authProvider: { type: String, enum: ["local", "google", "hybrid"], default: "local" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
