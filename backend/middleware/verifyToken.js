const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    // Try reading from cookie or Authorization header
    const token =
      req.cookies?.token ||
      (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ") &&
        req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info
    next();
  } catch (err) {
    console.error("verifyToken Error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
