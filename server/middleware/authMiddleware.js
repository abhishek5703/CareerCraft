import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied: No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {
      id: decoded._id || decoded.id,
      ...decoded,
    };
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
