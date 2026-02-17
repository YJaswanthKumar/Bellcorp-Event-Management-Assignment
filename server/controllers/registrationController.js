const Registration = require("../models/registration");
const Event = require("../models/event");

const registerForEvent = async (request, response) => {
  try {
    const { eventId } = request.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return response.status(404).json({ message: "Event not found" });
    }

    if (event.availableSeats <= 0) {
      return response.status(400).json({ message: "Event is full" });
    }

    // Check duplicate registration
    const existingRegistration = await Registration.findOne({
      user: request.user._id,
      event: eventId,
    });

    if (existingRegistration) {
      return response.status(400).json({ message: "Already registered" });
    }

    // Create registration
    await Registration.create({
      user: request.user._id,
      event: eventId,
    });

    // Decrement seat
    event.availableSeats -= 1;
    await event.save();

    response.json({ message: "Successfully registered" });
  } catch (error) {
    response.status(500).json({ message: "Registration failed" });
  }
};

// Get logged-in user's registered events
const getMyEvents = async (req, res) => {
  try {
    const registrations = await Registration.find({
      user: req.user._id,
    }).populate("event");

    const events = registrations.map((reg) => reg.event);

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching user events:", error);
    res.status(500).json({ message: "Failed to fetch registered events" });
  }
};

const cancelRegistration = async (request, response) => {
  try {
    const { eventId } = request.body;

    const registration = await Registration.findOne({
      user: request.user._id,
      event: eventId,
    });

    if (!registration) {
      return response.status(404).json({ message: "Registration not found" });
    }

    await Registration.deleteOne({ _id: registration._id });

    const event = await Event.findById(eventId);
    event.availableSeats += 1;
    await event.save();

    response.json({ message: "Registration cancelled" });
  } catch (error) {
    response.status(500).json({ message: "Cancellation failed" });
  }
};

module.exports = {
  registerForEvent,
  cancelRegistration,
  getMyEvents,
};
