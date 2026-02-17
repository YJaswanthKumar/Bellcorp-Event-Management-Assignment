const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticateToken = async (request, response, next) => {
  const authHead = request.headers["authorization"];
  const jwtToken = authHead && authHead.split(" ")[1];

  if (!jwtToken) {
    return response.status(401).send("Not authorized, no token");
  }

  try {
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    const user = await User.findById(payload.id).select("-password");

    if (!user) {
      return response.status(401).send("User not found");
    }

    request.user = user;
    console.log("Authenticated user:", user);
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return response.status(401).send("Invalid JWT token");
  }
};

module.exports = authenticateToken;
