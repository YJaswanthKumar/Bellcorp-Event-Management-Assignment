# Bellcorp Event Management Application

## Server Documentation

### Project Overview

This server is the backend component of the Bellcorp Event Management Application. It is developed using Node.js, Express.js, and MongoDB. The server exposes RESTful APIs to manage authentication, event discovery, event creation, and event registration.

The backend is responsible for secure user authentication, role based authorization, dynamic event data handling, and maintaining seat availability integrity during registration and cancellation operations.

## Core Functionalities

User registration and login with encrypted passwords
JWT based authentication
Role based access control for admin operations
Event creation and retrieval
Dynamic search and filtering support
Event registration with seat decrement logic
Registration cancellation with seat restoration
User dashboard event retrieval

## Technology Stack

Node.js
Express.js
MongoDB with Mongoose
JSON Web Token for authentication
bcryptjs for password hashing
CORS middleware
dotenv for environment configuration

## Project Structure

The overall project follows a full stack structure with separate client and server folders.

```
root/
│
├── server/
│   ├── app.js
│   ├── server.js
│   ├── seedEvents.js
│   ├── seedAdmin.js
│   ├── .env
│   ├── package.json
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   └── registrationController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── Registration.js
│   │
│   └── routes/
│       ├── authRoutes.js
│       ├── eventRoutes.js
│       ├── registrationRoutes.js
│       └── adminRoutes.js
│
├── client/
│   ├── package.json
│   │
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── EventCard.jsx
│       │   └── ProtectedRoute.jsx
│       │
│       ├── pages/
│       │   ├── Events.jsx
│       │   ├── EventDetails.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Login.jsx
│       │   └── Register.jsx
│       │
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   └── AuthContextObject.js
│       │
│       ├── services/
│       │   └── api.js
│       │
│       ├── styles/
│       │   └── main.css
│       │
│       ├── App.jsx
│       └── main.jsx
│
└── README.md
```

Server Description

app.js
Configures Express application, middleware, and route mounting.

server.js
Establishes MongoDB connection and starts the server.

controllers
Contains business logic for authentication, event operations, and registrations.

middleware
Handles JWT authentication and admin authorization.

models
Defines MongoDB schemas using Mongoose.

routes
Defines API endpoints and connects them to controller logic.

seedEvents.js
Seeds sample event data into the database.

seedAdmin.js
Creates default admin user for testing and administration.

## Database Models

User Model
Includes name, email, hashed password, and role field. The role field differentiates between normal users and administrators.

Event Model
Includes name, organizer, location, date, time, description, category, capacity, and availableSeats. The availableSeats field is dynamically updated based on registrations.

Registration Model
Stores references to user and event to track which user registered for which event.

## Environment Variables

Create a .env file inside the server folder with the following variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

## Installation

Navigate to the server folder and install dependencies:

npm install

## Running the Server

Development mode:

npm run dev

Production mode:

node server.js

The server runs on:

[http://localhost:5000](http://localhost:5000)

## Database Seeding

To insert sample events:

node seedEvents.js

To create admin user:

node seedAdmin.js

Default Admin Credentials
Email: [admin@bellcorp.com](mailto:admin@bellcorp.com)
Password: admin123

## Authentication Flow

Users register or login using authentication endpoints. Upon successful login, a JWT token is generated and returned to the client. The token must be included in the Authorization header for all protected routes.

Authorization header format:

Authorization: Bearer <token>

Protected routes verify the token and attach the authenticated user to the request object.

## API Endpoints

Authentication

POST /api/auth/register
Registers a new user with encrypted password.

POST /api/auth/login
Authenticates user and returns JWT token.

Events

GET /api/events
Returns all events. Supports search and filtering through query parameters.

GET /api/events/:id
Returns a single event by its ID.

POST /api/admin/events
Creates a new event. Accessible only to users with admin role.

Registrations

POST /api/registrations/register
Registers authenticated user for an event. Prevents duplicate registration and checks seat availability.

POST /api/registrations/cancel
Cancels registration and restores one seat.

GET /api/registrations/my-events
Returns all events registered by the authenticated user.

## Business Rules Implemented

Passwords are securely hashed before storing in the database.
JWT tokens expire after one day.
Users cannot register multiple times for the same event.
Registration fails if availableSeats is zero.
Seats decrease upon registration and increase upon cancellation.
Only admin users can create new events.
Past events cannot be registered.

## Deployment Notes

The backend can be deployed on Render or Railway.

Ensure the following during deployment:

Set environment variables in the hosting platform.
Use production MongoDB Atlas connection string.
Enable CORS for the frontend domain.
Verify that the frontend base URL matches the deployed backend URL.

## Developer

Bellcorp Studio Event Management Application
Developed by Jaswanth

This backend is designed to handle continuously growing event data efficiently while maintaining secure authentication and controlled access management.
