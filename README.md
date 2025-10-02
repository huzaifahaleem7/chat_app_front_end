React Group Chat Frontend

A modern frontend for a real-time group chat app built with React, Vite, Tailwind CSS, and Socket.IO.
Includes user authentication, real-time messaging, and responsive UI.

Features

React with Vite for fast development

Tailwind CSS for responsive UI

Authentication (Login / Signup) with session management

Real-time chat using Socket.IO

Send and receive messages with media support

Message list with avatars and timestamps

Loader component for better UX

Environment Variables

Create a .env file in the project root:

VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_SOCKET_URL=http://localhost:8000

Scripts
npm install       # Install dependencies
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build

Deployment

Build with npm run build

Deploy the dist/ folder on Netlify, Vercel, or any static host

Ensure backend API & Socket.IO server are accessible via correct URLs

License

MIT