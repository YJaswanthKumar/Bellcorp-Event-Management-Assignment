import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach token automatically
API.interceptors.request.use((request) => {
  const token = localStorage.getItem("bellcorp_token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

export const api = {
  login: async (email, password) => {
    const response = await API.post("/api/auth/login", { email, password });
    return response.data;
  },

  register: async (name, email, password) => {
    const response = await API.post("/api/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  },

  getEvents: async () => {
    const response = await API.get("/api/events");
    return response.data;
  },

  getEventById: async (id) => {
    const response = await API.get(`/api/events/${id}`);
    return response.data;
  },

  registerForEvent: async (eventId) => {
    const response = await API.post("/api/registrations/register", { eventId });
    return response.data;
  },

  cancelRegistration: async (eventId) => {
    const response = await API.post("/api/registrations/cancel", { eventId });
    return response.data;
  },

  getUserRegistrations: async () => {
    const response = await API.get("/api/registrations/my-events");
    return response.data;
  },
};
