import jwt from "jsonwebtoken";

const getJwtSecret = () => process.env.JWT_SECRET;

export const requireAuth = (req, res, next) => {
  const JWT_SECRET = getJwtSecret();
  const authHeader = req.headers.authorization;
  if (!JWT_SECRET) return res.status(500).json({ message: "Authentication service is not configured" });
  if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ message: "Access denied: No token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id || decoded._id, ...decoded };
    if (!req.user.id) return res.status(403).json({ message: "Invalid token" });
    next();
  } catch {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
