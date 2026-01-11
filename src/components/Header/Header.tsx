import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Text, Button } from '../../index';
import './Header.css';

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
          
          {/* Hamburger Menu Button */}
          <button 
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <Link to="/" className="nav-link home-link" onClick={closeMobileMenu}>
              <Button variant="ghost" size="sm">
                <Text variant="span" size="md" weight="medium">
                  Home
                </Text>
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/home" className="nav-link" onClick={closeMobileMenu}>
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
                <Link to="/login" onClick={closeMobileMenu}>
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={closeMobileMenu}>
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

