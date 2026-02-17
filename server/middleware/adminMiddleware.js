const adminOnly = (request, response, next) => {
  if (!request.user) {
    return response.status(401).json({ message: "Not authenticated" });
  }

  if (request.user.role !== "admin") {
    return response.status(403).json({ message: "Admin access only" });
  }

  next();
};

module.exports = adminOnly;
