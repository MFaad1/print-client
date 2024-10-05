const jwt = require("jsonwebtoken");

const verifyToken = (requiredRole) => {
  return (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded.user;

      if (req.user.role === "admin") {
        console.log("Admin access granted");
        return next();
      }

      if (requiredRole && req.user.role !== requiredRole) {
        return res
          .status(403)
          .json({ message: "Access denied, insufficient permissions" });
      }

      next();
    } catch (err) {
      console.error("Token verification failed:", err.message);
      res.status(401).json({ message: "Token is not valid" });
    }
  };
};

module.exports = verifyToken;
