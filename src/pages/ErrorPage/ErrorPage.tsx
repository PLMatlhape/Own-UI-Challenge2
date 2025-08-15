import React from 'react';
import { Link } from 'react-router-dom';
import { Text, Button } from '../../index';
import './errorPage.css';

const ErrorPage: React.FC = () => {
  return (
    <div className="error-page">
      <div className="container">
        <div className="error-content">
          <div className="error-code">
            <Text variant="h1" size="3xl" weight="bold" color="primary">
              404
            </Text>
          </div>
          
          <div className="error-message">
            <Text variant="h2" size="2xl" weight="bold" color="primary">
              Page Not Found
            </Text>
            <Text variant="p" size="lg" color="secondary" align="center">
              Sorry, the page you are looking for doesn't exist or has been moved.
            </Text>
          </div>
          
          <div className="error-actions">
            <Link to="/">
              <Button variant="primary" size="lg">
                Go Home
              </Button>
            </Link>
            <Link to="/home">
              <Button variant="outline" size="lg">
                Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="error-illustration">
            <div className="illustration-icon">🔍</div>
            <Text variant="p" size="md" color="muted" align="center">
              The page you're looking for seems to have wandered off...
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

