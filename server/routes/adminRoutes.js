const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const { createEvent } = require("../controllers/eventController");

// All admin routes must pass both middlewares
router.post("/events", authenticateToken, adminOnly, createEvent);

module.exports = router;
