# FocusHub

FocusHub is a collaborative deep-work platform for students. It brings study rooms, real-time communication, task management, and focus-session tracking together in one workspace.

The project is organized as a React/Vite frontend and an Express/MongoDB backend. REST APIs handle persistent application data, while Socket.IO provides real-time room and chat functionality.

## Features

### Authentication and users

- JWT authentication with bcrypt password hashing and HTTP-only cookies
- User registration, login, profile retrieval, and logout
- Protected REST API requests authenticated from the auth cookie

### Study rooms

- Public study rooms with host-based authorization
- Room creation, joining, leaving, updating, and deletion
- Room details, participant management, and host permissions

### Real-time collaboration

- Live room chat with Socket.IO
- Online-user presence
- Authenticated Socket.IO connections
- Persistent message history through the REST API

### Tasks and focus sessions

- Create, view, update, and delete room tasks
- Task status and priority management
- Start, view, complete, and cancel focus sessions

### Frontend experience

- React single-page application with Vite
- Dashboard and dedicated room workspace
- Responsive sidebar and navigation
- Login, registration, create-room, and join-room flows
- Toast notifications for user feedback
- Demo mode for exploring the interface without a running backend

## Tech stack

**Frontend:** React, Vite, Tailwind CSS, Lucide React, Socket.IO Client  
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Socket.IO, Zod
**Security and middleware:** Helmet, CORS, compression, cookie-parser, express-rate-limit
**Tools:** Git, GitHub, Postman, VS Code, Nodemon

## Architecture

```text
React/Vite client
      ├── REST API ──> Express routes
      │                    ├── middleware
      │                    ├── controllers
      │                    ├── services
      │                    └── Mongoose models ──> MongoDB
      └── Socket.IO ──> authenticated room and chat events
```

The backend uses a layered structure so that HTTP concerns, business logic, persistence, authentication, and real-time events remain separated.

## Project structure

```text
FocusHub/
├── frontend/       # React/Vite client
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── styles.css
├── backend/        # Express API and Socket.IO server
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       ├── services/
│       └── sockets/
└── README.md
```

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/Harshita-26nitp/FocusHub.git
cd FocusHub
```

### 2. Start the backend

```bash
cd backend
npm install
cp .env.example .env
```

Set the values in `backend/.env`:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
AUTH_COOKIE_NAME=focushub_token
NODE_ENV=development
```

Then run:

```bash
npm run dev
```

The API is available at `http://localhost:8000/api/v1`.

### 3. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
cp .env.example .env
```

For the full application, use:

```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_SOCKET_URL=http://localhost:8000
VITE_DEMO_MODE=false
```

Start Vite:

```bash
npm run dev
```

To preview the interface without MongoDB or the backend, set `VITE_DEMO_MODE=true`.

## Main API routes

All routes are prefixed with `/api/v1`.

| Area | Routes |
| --- | --- |
| Auth | `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, `GET /auth/me` |
| Rooms | `GET /rooms`, `POST /rooms`, `GET /rooms/:roomId`, `POST /rooms/:roomId/join`, `POST /rooms/:roomId/leave` |
| Tasks | `POST /rooms/:roomId/tasks`, `GET /rooms/:roomId/tasks`, `PUT /tasks/:taskId`, `DELETE /tasks/:taskId` |
| Focus sessions | `POST /rooms/:roomId/focus-sessions`, `GET /rooms/:roomId/focus-sessions`, completion/cancellation routes |
| Messages | `GET /rooms/:roomId/messages` |

Message creation and live room events are handled through Socket.IO.

## Authentication and real-time flow

1. A user registers or logs in; the backend hashes passwords with bcrypt and creates a JWT.
2. The backend stores the JWT in an HTTP-only authentication cookie.
3. Authentication middleware verifies the token and attaches the user to the request.
4. Socket.IO authenticates the handshake using the same cookie.
5. Authenticated clients join room channels and receive messages and presence updates in real time.

## Security notes

- Never commit `.env` files or real database credentials.
- Use a long, randomly generated `JWT_SECRET` outside local development.
- Authentication cookies use `HttpOnly` so frontend JavaScript cannot read them.
- Authentication cookies use `Secure` in production and `SameSite` protection.
- Frontend requests use credentials, while backend CORS allows only configured frontend origins.
- Configure CORS and cookie settings with the deployed frontend origin before production.
- Add CSRF tokens if the deployment becomes cross-site or supports state-changing requests from multiple origins.

## License

This project is currently intended for learning and portfolio use.
