# FocusHub frontend

React + Vite + Tailwind CSS interface for the FocusHub backend.

## Recommended structure

```text
src/
├── main.jsx                 # React entry point
├── styles.css               # Tailwind theme and global styles
├── config/env.js            # API/socket environment config
├── constants/room.js        # Room/task enums shared by forms
├── services/api.js          # REST client with JWT support
├── services/socket.js       # Socket.IO connection factory
├── app/App.jsx              # App shell and route state (next extraction)
├── components/
│   ├── auth/                # Login/register UI
│   ├── layout/              # Sidebar, topbar, navigation
│   ├── rooms/               # Room cards, create/join modals
│   ├── focus/               # Timer and focus session controls
│   ├── tasks/               # Task list and task forms
│   └── chat/                # Messages and room chat
├── pages/
│   ├── DashboardPage.jsx
│   ├── RoomPage.jsx
│   └── NotFoundPage.jsx
└── data/mockData.js         # Demo data used before API connection
```

The current visual prototype is kept in `src/main.jsx` so it can be run immediately. The `config`, `constants`, and `services` folders are already prepared for the next extraction into page/component files.

## Run

```bash
npm install
npm run dev
```

The interface starts in a polished demo mode so all screens can be explored without a running database. To connect the room chat socket, set:

```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_SOCKET_URL=http://localhost:8000
```

The UI is organized around the backend features: auth entry, room discovery, room creation, invite-code joining, focus sessions, tasks, chat, members, and presence. The existing backend remains in the supplied archive and is not overwritten.

