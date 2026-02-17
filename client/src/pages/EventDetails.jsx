import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextObject";
import { api } from "../services/api";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = await api.getEventById(id);
        setEvent(eventData);

        if (user) {
          const myEvents = await api.getUserRegistrations();
          const already = myEvents.find((e) => e._id === id);
          if (already) {
            setIsRegistered(true);
          }
        }
      } catch (err) {
        console.error("Failed to load event", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  const handleRegister = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setRegistering(true);
    setError("");
    setSuccess("");

    try {
      await api.registerForEvent(event._id);
      setSuccess("Successfully registered!");
      setIsRegistered(true);

      const updatedEvent = await api.getEventById(id);
      setEvent(updatedEvent);
    } catch (err) {
      const message =
        err.response?.data?.message || "Something went wrong";
      setError(message);
    } finally {
      setRegistering(false);
    }
  };

  const handleCancel = async () => {
    setRegistering(true);
    setError("");
    setSuccess("");

    try {
      await api.cancelRegistration(event._id);
      setSuccess("Registration cancelled.");
      setIsRegistered(false);

      const updatedEvent = await api.getEventById(id);
      setEvent(updatedEvent);
    } catch (err) {
      const message =
        err.response?.data?.message || "Something went wrong";
      setError(message);
    } finally {
      setRegistering(false);
    }
  };

  if (loading) return <div className="container">Loading details...</div>;
  if (!event) return <div className="container">Event not found</div>;

  const isPastEvent = new Date(event.date) < new Date();

  return (
    <div className="container">
      <button
        onClick={() => navigate(-1)}
        className="btn"
        style={{ marginBottom: "1rem", backgroundColor: "#6c757d" }}
      >
        Back to Events
      </button>

      <div className="event-details-container">
        <h2>
          {event.name}{" "}
          {isPastEvent && (
            <span style={{ color: "gray", fontSize: "0.9rem" }}>
              (Completed)
            </span>
          )}
        </h2>

        <div className="event-meta">
          <p><strong>Organizer:</strong> {event.organizer}</p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(event.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p><strong>Time:</strong> {event.time}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Category:</strong> {event.category}</p>
          <p>
            <strong>Available Seats:</strong>{" "}
            {event.availableSeats} / {event.capacity}
          </p>
        </div>

        <div style={{ margin: "2rem 0" }}>
          <h3>Description</h3>
          <p>{event.description}</p>
        </div>

        {error && (
          <div style={{ color: "red", marginBottom: "1rem" }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ color: "green", marginBottom: "1rem" }}>
            {success}
          </div>
        )}

        {isPastEvent ? (
          <div className="sold-out" style={{ color: "gray" }}>
            Event Completed
          </div>
        ) : isRegistered ? (
          <button
            onClick={handleCancel}
            disabled={registering}
            className="btn btn-danger btn-block"
          >
            {registering ? "Processing..." : "Cancel Registration"}
          </button>
        ) : event.availableSeats > 0 ? (
          <button
            onClick={handleRegister}
            disabled={registering}
            className="btn btn-block"
          >
            {registering ? "Processing..." : "Register for Event"}
          </button>
        ) : (
          <div className="sold-out">SOLD OUT</div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
