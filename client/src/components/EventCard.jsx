import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.name}</h3>
      <div className="event-info">
        <strong>Date:</strong> {new Date(event.date).toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "long",
  year: "numeric",
})}
      </div>
      <div className="event-info">
        <strong>Location:</strong> {event.location}
      </div>
      <div className="event-info">
        <strong>Category:</strong> {event.category}
      </div>
      <div className="event-info">
        <strong>Available Seats:</strong> {event.availableSeats}
      </div>
      
      <Link to={`/events/${event._id}`} className="btn btn-block event-details-link" style={{ textDecoration: 'none' }}>
        View Details
      </Link>
    </div>
  );
};

export default EventCard;
