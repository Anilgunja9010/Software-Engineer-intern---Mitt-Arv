
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY || "mysecretkey";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // safer than req.header()

  if (!authHeader) {
    return res
      .status(401)
      .json({ error: "No token, authorization denied" });
  }

  // Expect format: "Bearer <token>"
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ error: "Invalid token format, must be 'Bearer <token>'" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    
    // 👇 Attach user object
    req.user = { id: decoded.userId };  

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;