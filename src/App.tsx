import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { 
  Header, 
  Landing, 
  Login, 
  Register, 
  Home, 
  JobDetails, 
  ErrorPage
} from './index';
import type { User } from './index';
import './App.css';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    
    const storedUser = localStorage.getItem('jobTracker_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
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
                  <Home user={user} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/job/:id" 
              element={
                <ProtectedRoute>
                  <JobDetails user={user} />
                </ProtectedRoute>
              } 
            />
            <Route path="/404" element={<ErrorPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

