# FocusHub — A Collaborative Deep Work Platform

FocusHub is a collaborative study platform designed to help students work together in focused study rooms while providing tools for communication, task management, and focused work sessions.

## The Features of my project FocusHub

* JWT-based user authentication
* User registration and login with bcrypt password hashing
* Public study rooms
* Room creation, joining, leaving, updating, and deletion
* Host-based room authorization
* Real-time online presence using Socket.IO
* Real-time room messaging
* Task management with status and priority
* Focus session management
* RESTful APIs
* MongoDB database with Mongoose
* API testing using Postman

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Socket.IO

### Development & Testing

* Git
* GitHub
* Postman
* VS Code

## Backend Architecture

The backend follows a layered architecture to keep it secure:
```text
Client / Postman
      ↓
    Routes
      ↓
  Middleware
      ↓
 Controllers
      ↓
   Services
      ↓
 Mongoose Models
      ↓
   MongoDB
```
This separation keeps HTTP handling, business logic, authentication, and database operations organized.Also the structured layout makes the process of doing updates easier.

## Project Structure
```text
backend/
└── src/
    ├── config/
    ├── controllers/
    ├── middlewares/
    ├── models/
    ├── routes/
    ├── services/
    ├── sockets/
    └── utils/
```

## Authentication Flow

FocusHub uses JWT-based authentication for protected APIs.
```text
Client
  ↓
Login
  ↓
JWT generated
  ↓
Authorization: Bearer <token>
  ↓
Authentication Middleware
  ↓
JWT Verification
  ↓
User Lookup
  ↓
req.user
  ↓
Controller
```

Passwords are hashed using bcrypt before being stored.

## Real-Time Communication

Socket.IO is used for real-time communication.
The socket connection is authenticated using the user's JWT during the handshake.

```text
Client connects
      ↓
JWT sent in handshake
      ↓
Socket authentication middleware
      ↓
JWT verification
      ↓
socket.user
      ↓
Join Socket.IO room
      ↓
Real-time events
```

Current real-time functionality includes online-user presence and room messaging.

## API Endpoints

### Authentication

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| POST   | `/api/v1/auth/register` | Register a user        |
| POST   | `/api/v1/auth/login`    | Login                  |
| GET    | `/api/v1/auth/me`       | Get authenticated user |

### Rooms

| Method | Endpoint                      | Description      |
| ------ | ----------------------------- | ---------------- |
| POST   | `/api/v1/rooms`               | Create a room    |
| GET    | `/api/v1/rooms`               | Get public rooms |
| GET    | `/api/v1/rooms/my-rooms`      | Get user's rooms |
| GET    | `/api/v1/rooms/:roomId`       | Get room details |
| POST   | `/api/v1/rooms/:roomId/join`  | Join a room      |
| POST   | `/api/v1/rooms/:roomId/leave` | Leave a room     |
| PUT    | `/api/v1/rooms/:roomId`       | Update a room    |
| DELETE | `/api/v1/rooms/:roomId`       | Delete a room    |

### Messages

| Method | Endpoint                         | Description       |
| ------ | -------------------------------- | ----------------- |
| GET    | `/api/v1/rooms/:roomId/messages` | Get room messages |

Message creation is handled through Socket.IO for real-time delivery.

### Tasks

| Method | Endpoint                      | Description    |
| ------ | ----------------------------- | -------------- |
| POST   | `/api/v1/rooms/:roomId/tasks` | Create a task  |
| GET    | `/api/v1/rooms/:roomId/tasks` | Get room tasks |
| PUT    | `/api/v1/tasks/:taskId`       | Update a task  |
| DELETE | `/api/v1/tasks/:taskId`       | Delete a task  |

### Focus Sessions

| Method | Endpoint                                     | Description              |
| ------ | -------------------------------------------- | ------------------------ |
| POST   | `/api/v1/rooms/:roomId/focus-sessions`       | Start a focus session    |
| GET    | `/api/v1/rooms/:roomId/focus-sessions`       | Get room focus sessions  |
| PUT    | `/api/v1/focus-sessions/:sessionId/complete` | Complete a focus session |
| PUT    | `/api/v1/focus-sessions/:sessionId/cancel`   | Cancel a focus session   |

## API Testing
The REST APIs are tested using Postman.
Typical authentication flow is as follows:

```text
Register
   ↓
Login
   ↓
Receive JWT
   ↓
Use Bearer Token
   ↓
Access protected APIs
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```
Do not commit `.env` to GitHub.
A `.env.example` file is included as a template.

## Running the Project
Clone the repository:

```bash
git clone https://github.com/Harshita-26nitp/FocusHub.git
cd FocusHub/backend
```

Install dependencies:

```bash
npm install
```

Create the `.env` file and add the required environment variables.

Start the development server:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:8000
```

Health check:

```text
GET /api/v1/health
```

## Project Status

The backend REST API, authentication, room management, messaging infrastructure, task management, focus-session functionality, and Socket.IO infrastructure are implemented and being tested with Postman.
The React frontend is being developed separately and will be integrated with the backend APIs in the furture.Right now its a backend project.
