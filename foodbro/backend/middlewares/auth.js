const { verifyToken } = require("../utils/auth");

const checkAuth = async (req, res, next) => {
  try {
    // Extract token from Authorization header or cookies
    let token;

    // Check Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // If not found in header, check cookies
    if (!token) {
      token = req.cookies?.token;
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify and decode token
    const decoded = verifyToken(token);
    console.log("Decoded token:", decoded); // Debug log

    // Set user info in request
    req.user = {
      id: decoded.id,      // Ensure it matches your token payload
      username: decoded.username,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { checkAuth };
