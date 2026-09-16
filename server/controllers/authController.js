import User from "../models/User.js";
import UserProgress from "../models/UserProgress.js";
import QuizAttempt from "../models/QuizAttempt.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  createFirebasePasswordUser,
  signInFirebasePassword,
  signInFirebaseGoogle,
  sendFirebasePasswordReset,
  confirmFirebasePasswordReset,
  deleteFirebaseAccount,
  refreshFirebaseIdToken,
  isFirebaseConfigured,
} from "../utils/firebaseAuth.js";

const getJwtSecret = () => process.env.JWT_SECRET;
const signAppToken = (user) => {
  const secret = getJwtSecret();
  if (!secret) throw new Error("JWT_SECRET is not configured");
  return jwt.sign({ id: user._id.toString() }, secret, { expiresIn: "1d" });
};
const publicUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  profilePic: user.profilePic || null,
  authProvider: user.authProvider || "local",
});
const firebaseBundle = (data) => ({
  firebaseIdToken: data?.idToken || null,
  firebaseRefreshToken: data?.refreshToken || null,
  firebaseUid: data?.localId || null,
});

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const normalizedEmail = email?.trim().toLowerCase();
  if (!name?.trim() || !normalizedEmail || !password) return res.status(400).json({ message: "Name, email and password are required" });
  if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });
  try {
    if (await User.findOne({ email: normalizedEmail })) return res.status(400).json({ message: "Email already in use" });
    const user = await User.create({ name: name.trim(), email: normalizedEmail, password: await bcrypt.hash(password, 12) });
    let firebaseData = null;
    if (isFirebaseConfigured()) {
      try {
        firebaseData = await createFirebasePasswordUser(normalizedEmail, password);
        user.firebaseUid = firebaseData.localId;
        user.authProvider = "hybrid";
        await user.save();
      } catch (e) { console.warn("Firebase signup link skipped:", e.firebaseCode || e.message); }
    }
    res.status(201).json({ token: signAppToken(user), user: publicUser(user), ...firebaseBundle(firebaseData) });
  } catch (err) { res.status(500).json({ message: "Signup failed", error: err.message }); }
};

const migrateLocalAccountToFirebase = async (user, email, password) => {
  if (!isFirebaseConfigured()) return null;
  try {
    const signedIn = await signInFirebasePassword(email, password);
    user.firebaseUid = user.firebaseUid || signedIn.localId;
    user.authProvider = "hybrid";
    await user.save();
    return signedIn;
  } catch (error) {
    if (error.firebaseCode !== "EMAIL_NOT_FOUND") throw error;
    try {
      const created = await createFirebasePasswordUser(email, password);
      user.firebaseUid = created.localId;
      user.authProvider = "hybrid";
      await user.save();
      return created;
    } catch (e) { console.warn("Firebase account migration skipped:", e.firebaseCode || e.message); return null; }
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email?.trim().toLowerCase();
  try {
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    if (!(await bcrypt.compare(password, user.password))) {
      if (isFirebaseConfigured()) {
        try {
          const firebaseData = await signInFirebasePassword(normalizedEmail, password);
          user.password = await bcrypt.hash(password, 12);
          user.firebaseUid = firebaseData.localId;
          user.authProvider = "hybrid";
          await user.save();
          return res.json({ token: signAppToken(user), user: publicUser(user), ...firebaseBundle(firebaseData) });
        } catch { /* preserve normal invalid-credentials response */ }
      }
      return res.status(400).json({ message: "Invalid credentials" });
    }
    let firebaseData = null;
    try { firebaseData = await migrateLocalAccountToFirebase(user, normalizedEmail, password); }
    catch (e) { console.warn("Firebase login sync skipped:", e.firebaseCode || e.message); }
    res.json({ token: signAppToken(user), user: publicUser(user), ...firebaseBundle(firebaseData) });
  } catch (err) { res.status(500).json({ message: "Login failed", error: err.message }); }
};

export const googleLogin = async (req, res) => {
  const { idToken, requestUri } = req.body;
  if (!idToken) return res.status(400).json({ message: "Google credential is required" });
  if (!isFirebaseConfigured()) return res.status(503).json({ message: "Firebase Google authentication is not configured yet" });
  try {
    const firebaseData = await signInFirebaseGoogle(idToken, requestUri || process.env.FRONTEND_URL || "http://localhost:5173");
    const email = firebaseData.email?.trim().toLowerCase();
    if (!email) return res.status(400).json({ message: "Google account did not provide an email" });
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: firebaseData.displayName || email.split("@")[0],
        email,
        password: await bcrypt.hash(crypto.randomBytes(32).toString("hex"), 12),
        profilePic: firebaseData.photoUrl || null,
        firebaseUid: firebaseData.localId,
        authProvider: "google",
      });
    } else {
      user.firebaseUid = firebaseData.localId;
      user.authProvider = user.authProvider === "local" ? "hybrid" : "google";
      if (!user.profilePic && firebaseData.photoUrl) user.profilePic = firebaseData.photoUrl;
      await user.save();
    }
    res.json({ token: signAppToken(user), user: publicUser(user), ...firebaseBundle(firebaseData) });
  } catch (err) {
    const known = err.firebaseCode === "NEED_CONFIRMATION" ? "This email already uses password login. Sign in with your password first, then try Google again." : "Google authentication failed";
    res.status(401).json({ message: known });
  }
};

export const forgotPassword = async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  try {
    const user = await User.findOne({ email });
    if (!user || !isFirebaseConfigured()) return res.json({ message: "If an account exists for that email, a password reset email has been sent." });
    if (!user.firebaseUid) {
      try {
        const created = await createFirebasePasswordUser(email, crypto.randomBytes(32).toString("hex"));
        user.firebaseUid = created.localId;
        user.authProvider = "hybrid";
        await user.save();
      } catch (e) { if (e.firebaseCode !== "EMAIL_EXISTS") throw e; }
    }
    await sendFirebasePasswordReset(email);
    res.json({ message: "If an account supports password login, a password reset email has been sent." });
  } catch (e) {
    console.warn("Forgot password error:", e.firebaseCode || e.message);
    res.json({ message: "If an account exists for that email, a password reset email has been sent." });
  }
};

export const resetPassword = async (req, res) => {
  const { oobCode, newPassword } = req.body;
  if (!oobCode || !newPassword || newPassword.length < 6) return res.status(400).json({ message: "A valid reset code and a password of at least 6 characters are required" });
  try {
    const result = await confirmFirebasePasswordReset(oobCode, newPassword);
    const email = result.email?.trim().toLowerCase();
    if (email) {
      const user = await User.findOne({ email });
      if (user) { user.password = await bcrypt.hash(newPassword, 12); user.firebaseUid = user.firebaseUid || result.localId || null; await user.save(); }
    }
    res.json({ message: "Password reset successfully" });
  } catch (e) {
    const msg = { EXPIRED_OOB_CODE: "This reset link has expired. Request a new one.", INVALID_OOB_CODE: "This reset link is invalid or has already been used.", USER_DISABLED: "This account is disabled." }[e.firebaseCode] || "Unable to reset the password. Please request a new reset email.";
    res.status(400).json({ message: msg });
  }
};

export const updateProfile = async (req, res) => {
  const { name, profilePic } = req.body;
  if (!name?.trim()) return res.status(400).json({ message: "Name is required" });
  if (profilePic && (!profilePic.startsWith("data:image/") || profilePic.length > 850000)) return res.status(400).json({ message: "Profile image must be a valid image smaller than about 620 KB" });
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.name = name.trim(); user.profilePic = profilePic || null; await user.save();
    res.json({ user: publicUser(user) });
  } catch { res.status(500).json({ message: "Failed to update profile" }); }
};

export const deleteProfile = async (req, res) => {
  const { firebaseIdToken, firebaseRefreshToken } = req.body || {};
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.firebaseUid && isFirebaseConfigured()) {
      try {
        let idToken = firebaseIdToken;
        if (!idToken && firebaseRefreshToken) idToken = (await refreshFirebaseIdToken(firebaseRefreshToken)).id_token;
        if (idToken) await deleteFirebaseAccount(idToken);
      } catch (e) { console.warn("Firebase account deletion warning:", e.firebaseCode || e.message); }
    }
    await Promise.all([UserProgress.deleteMany({ userId: user._id }), QuizAttempt.deleteMany({ userId: user._id }), User.deleteOne({ _id: user._id })]);
    res.json({ message: "Profile and associated learning data deleted successfully" });
  } catch { res.status(500).json({ message: "Failed to delete profile" }); }
};
