const Event = require("../models/event");

//Creating a new Event (Admin Only)
const createEvent = async (request, response) => {
  try {
    const {
      name,
      organizer,
      location,
      date,
      time,
      category,
      capacity,
      availableSeats,
      description,
    } = request.body;

    const event = await Event.create({
      name,
      organizer,
      location,
      date,
      time,
      category,
      capacity,
      availableSeats: availableSeats !== undefined ? availableSeats : capacity,
      description,
    });

    response.status(201).json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    response.status(400).json({ message: "Failed to create event" });
  }
};

// Get all events with search and filters
const getEvents = async (request, response) => {
  try {
    const { search, category, location, date } = request.query;

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (date) {
      query.date = { $gte: new Date(date) };
    }

    const events = await Event.find(query).sort({ date: 1 });

    response.json(events);
  } catch (error) {
    response.status(500).json({ message: "Server Error" });
  }
};

// Get single event
const getEventById = async (request, response) => {
  try {
    const event = await Event.findById(request.params.id);

    if (!event) {
      return response.status(404).json({ message: "Event not found" });
    }

    response.json(event);
  } catch (error) {
    response.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
};
