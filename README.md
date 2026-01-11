# JobTracker with localStorage

This is the **FixedStorage** branch of the JobTracker project, optimized for hosting platforms like Vercel. This version uses **localStorage** instead of JSON Server for data persistence, eliminating the need for a backend server.

## Features

- 📱 **Fully Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- 🍔 **Hamburger Menu** - Mobile-friendly navigation with smooth animations
- 🔄 **Sorting & Filtering** - Sort by date, company, role, or status
- ✏️ **Edit Functionality** - Update job applications inline
- 💾 **localStorage Persistence** - All data saved locally in your browser
- 🎨 **Modern UI** - Clean, intuitive interface with React & TypeScript

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Application
```bash
npm run dev
```

### 3. Access the Application
- Frontend: http://localhost:5173

## Branch Differences

- **dev branch**: Uses JSON Server for API-based data storage (requires backend)
- **FixedStorage branch** (this branch): Uses localStorage for client-side storage (no backend needed)
- **main branch**: Production-ready version

## Hosting

This branch is specifically designed for hosting on platforms like:
- Vercel
- Netlify  
- GitHub Pages
- Any static hosting service

No server configuration needed!

## Changes Made

1. **Added JSON Server**: Replaced localStorage with a REST API
2. **Created API Service**: `src/services/api.ts` handles all API calls
3. **Updated Components**: All components now use API calls instead of localStorage
4. **Added Error Handling**: Better error messages and loading states
5. **Updated Types**: Added `userId` field to Job interface

## Default Login Credentials

- Username: `demo`
- Password: `demo123`

## Database File

The `db.json` file contains sample data. You can edit this file to add more users or jobs, and the server will automatically reload.

## Troubleshooting

1. **Make sure JSON Server is running** on port 3001
2. **Check console for errors** - network errors usually indicate the server isn't running
3. **CORS issues**: JSON Server handles CORS automatically
4. **Port conflicts**: Change ports in package.json if needed

## Development

The application now maintains session state using localStorage for the current user session, while all job data is stored and retrieved from the JSON Server API.

## Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: JSON Server (REST API)
- **Styling**: CSS with custom design system
- **State Management**: React useState/useEffect
- **HTTP Client**: Axios
- **Development**: Concurrently for running multiple servers
