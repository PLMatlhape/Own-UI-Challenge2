import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Text, Button } from '../../index';
import './Header.css';

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="header-logo">
            <Text variant="h2" size="xl" weight="bold" color="primary">
              JobTracker
            </Text>
          </Link>
          
          <nav className="header-nav">
            {isAuthenticated ? (
              <>
                <Link to="/home" className="nav-link">
                  <Text variant="span" size="md" weight="medium">
                    Dashboard
                  </Text>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <div className="auth-buttons">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

