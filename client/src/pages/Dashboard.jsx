import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextObject";
import { api } from "../services/api";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        if (user) {
          const data = await api.getUserRegistrations();
          setRegisteredEvents(data);
        }
      } catch (error) {
        console.error("Failed to fetch registrations", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [user]);

  if (loading) return <div className="container">Loading dashboard...</div>;

  const today = new Date();

  const upcomingEvents = registeredEvents.filter(
    (e) => new Date(e.date) >= today
  );

  const pastEvents = registeredEvents.filter(
    (e) => new Date(e.date) < today
  );

  return (
    <div className="container">
      <div className="dashboard-section">
        <h2 className="section-title">My Dashboard</h2>
        <p>
          Welcome back, <strong>{user?.name}</strong>!
        </p>
        <p>Email: {user?.email}</p>
      </div>

      {/* Upcoming Events */}
      <div className="dashboard-section">
        <h3 className="section-title">My Upcoming Events</h3>
        {upcomingEvents.length > 0 ? (
          <div className="events-grid">
            {upcomingEvents.map((event) => (
              <div
                key={event._id}
                className="event-card"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/events/${event._id}`)}
              >
                <h3>{event.name}</h3>
                <p>
                  Date:{" "}
                  {new Date(event.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p>Location: {event.location}</p>
                <div
                  style={{
                    marginTop: "1rem",
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  Registered
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You have no upcoming events registered.</p>
        )}
      </div>

      {/* Past Events */}
      <div className="dashboard-section">
        <h3 className="section-title">Past Events</h3>
        {pastEvents.length > 0 ? (
          <div className="events-grid">
            {pastEvents.map((event) => (
              <div
                key={event._id}
                className="event-card"
                style={{ opacity: 0.7, cursor: "pointer" }}
                onClick={() => navigate(`/events/${event._id}`)}
              >
                <h3>{event.name}</h3>
                <p>
                  Date:{" "}
                  {new Date(event.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p>Location: {event.location}</p>
                <div style={{ marginTop: "1rem", color: "gray" }}>
                  Attended
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No past events found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
