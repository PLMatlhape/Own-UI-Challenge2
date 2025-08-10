import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { 
  Header, 
  Landing, 
  Login, 
  Register, 
  Home, 
  JobDetails, 
  NotFound
} from './index';
import type { User } from './index';
import './App.css';

function App() {
  const [, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('jobTracker_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('jobTracker_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('jobTracker_user');
    localStorage.removeItem('jobTracker_jobs');
  };

  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <div className="app">
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/home" replace /> : 
                <Login onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/register" 
              element={
                isAuthenticated ? 
                <Navigate to="/home" replace /> : 
                <Register onRegister={handleLogin} />
              } 
            />
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/job/:id" 
              element={
                <ProtectedRoute>
                  <JobDetails />
                </ProtectedRoute>
              } 
            />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

