# React Group Chat Frontend

A modern and responsive frontend for a real-time group chat application built with **React, Vite, Tailwind CSS, and Socket.IO**.  
It provides authentication, real-time messaging, media sharing, and a clean UI for seamless chat experiences.

---

## Features
- React + Vite for fast development  
- Tailwind CSS for responsive design  
- Authentication (Login / Signup) with session management  
- Real-time chat with Socket.IO  
- Send and receive messages with media support  
- Message list with avatars and timestamps  
- Loader component for smooth user experience  

---

## Environment Variables
Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_SOCKET_URL=http://localhost:8000

Scripts
npm install     # Install dependencies
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build

Deployment

Run npm run build to generate the production build.

Deploy the dist/ folder to a static hosting provider such as Netlify, Vercel, or any VPS.

Ensure the backend API and Socket.IO server are accessible with the correct URLs.

License

MIT