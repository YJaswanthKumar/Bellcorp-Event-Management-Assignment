import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { api } from "../services/api";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [month, setMonth] = useState("All");
  const [year, setYear] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await api.getEvents();
        // Sort descending by date
        const sorted = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setEvents(sorted);
        setFilteredEvents(sorted);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let result = [...events];

    // Search filter
    if (search) {
      result = result.filter(
        (event) =>
          event.name.toLowerCase().includes(search.toLowerCase()) ||
          event.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category !== "All") {
      result = result.filter((event) => event.category === category);
    }

    // Location filter
    if (location !== "All") {
      result = result.filter((event) => event.location === location);
    }

    // Month filter
    if (month !== "All") {
      result = result.filter((event) => {
        const eventMonth = new Date(event.date).toLocaleString("default", {
          month: "long",
        });
        return eventMonth === month;
      });
    }

    // Year filter
    if (year !== "All") {
      result = result.filter(
        (event) =>
          new Date(event.date).getFullYear().toString() === year.toString()
      );
    }

    setFilteredEvents(result);
  }, [search, category, location, month, year, events]);

  if (loading) return <div className="container">Loading events...</div>;

  const categories = [
    "All",
    ...new Set(events.map((event) => event.category)),
  ];

  const locations = [
    "All",
    ...new Set(events.map((event) => event.location)),
  ];

  const years = [
    "All",
    ...new Set(events.map((event) => new Date(event.date).getFullYear())),
  ];

  const months = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="container">
      <h2>All Events</h2>

      {/* CATEGORY TAGS */}
      <div style={{ marginBottom: "1rem" }}>
        <strong>Categories: </strong>
        {categories.map((cat) => (
          <span
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              marginRight: "10px",
              padding: "6px 12px",
              borderRadius: "20px",
              border: "1px solid #007bff",
              cursor: "pointer",
              backgroundColor: category === cat ? "#007bff" : "white",
              color: category === cat ? "white" : "#007bff",
              fontSize: "0.85rem",
            }}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* LOCATION TAGS */}
      <div style={{ marginBottom: "1rem" }}>
        <strong>Locations: </strong>
        {locations.map((loc) => (
          <span
            key={loc}
            onClick={() => setLocation(loc)}
            style={{
              marginRight: "10px",
              padding: "6px 12px",
              borderRadius: "20px",
              border: "1px solid #28a745",
              cursor: "pointer",
              backgroundColor: location === loc ? "#28a745" : "white",
              color: location === loc ? "white" : "#28a745",
              fontSize: "0.85rem",
            }}
          >
            {loc}
          </span>
        ))}
      </div>

      {/* DATE FILTER */}
      <div style={{ marginBottom: "1.5rem" }}>
        <strong>Date Filter: </strong>

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <select value={year} onChange={(e) => setYear(e.target.value)}>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* SEARCH BAR */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search events..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* EVENTS GRID */}
      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))
        ) : (
          <p>No events found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
