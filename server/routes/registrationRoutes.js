const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const {
  registerForEvent,
  cancelRegistration,
  getMyEvents,
} = require("../controllers/registrationController");

router.post("/register", authenticateToken, registerForEvent);
router.get("/my-events", authenticateToken, getMyEvents);
router.post("/cancel", authenticateToken, cancelRegistration);

module.exports = router;
