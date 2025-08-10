# JobTracker with JSON Server

This project has been updated to use JSON Server instead of localStorage for data persistence.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Application
You have two options:

**Option A: Run both servers at once (Recommended)**
```bash
npm run dev:full
```
This will start both the JSON Server (port 3001) and Vite dev server (port 5173) simultaneously.

**Option B: Run servers separately**
```bash
# Terminal 1 - Start JSON Server
npm run server

# Terminal 2 - Start Vite dev server
npm run dev
```

### 3. Access the Application
- Frontend: http://localhost:5173
- JSON Server API: http://localhost:3001

## API Endpoints

The JSON Server provides the following endpoints:

### Users
- `GET /users` - Get all users
- `GET /users?username={username}&password={password}` - Login
- `GET /users?username={username}` - Check if username exists
- `POST /users` - Create new user

### Jobs
- `GET /jobs` - Get all jobs
- `GET /jobs?userId={userId}` - Get jobs by user ID
- `GET /jobs/{id}` - Get single job
- `POST /jobs` - Create new job
- `PATCH /jobs/{id}` - Update job
- `DELETE /jobs/{id}` - Delete job

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
