import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Text, Button } from '../../index';
import type { User } from '../../index';
import { userAPI, handleAPIError } from '../../services/api';
import './Login.css';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call API to authenticate user
      const user = await userAPI.login(username, password);
      
      if (user) {
        onLogin(user);
        navigate('/home');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError(handleAPIError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background with floating shapes */}
      <div className="login-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <div className="login-container">
        <div className="login-content">
          {/* Left side - Welcome content */}
          <div className="welcome-section">
            <div className="welcome-badge">
              <span className="badge-icon">🚀</span>
              <span>Welcome Back</span>
            </div>
            <Text variant="h1" className="welcome-title">
              Continue Your
              <span className="title-highlight"> Career Journey</span>
            </Text>
            <Text className="welcome-description">
              Access your personalized job tracking dashboard and stay on top of 
              your applications with intelligent insights and seamless organization.
            </Text>
            <div className="welcome-stats">
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <span className="stat-label">Success Rate</span>
              </div>
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="form-section">
            <div className="form-container">
              <div className="form-header">
                <Text variant="h2" className="form-title">
                  Sign In
                </Text>
                <Text className="form-subtitle">
                  Enter your credentials to access your account
                </Text>
              </div>

              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="username" className="form-label">
                    <Text variant="label" size="sm" weight="medium">
                      Username
                    </Text>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      required
                      disabled={loading}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    <Text variant="label" size="sm" weight="medium">
                      Password
                    </Text>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      disabled={loading}
                      className="form-input"
                    />
                  </div>
                </div>

                {error && (
                  <div className="form-error">
                    <div className="error-icon">⚠️</div>
                    <Text variant="p" size="sm" className="error-text">
                      {error}
                    </Text>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={loading}
                  disabled={!username || !password}
                  className="login-button"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              <div className="form-footer">
                <div className="footer-divider"></div>
                <Text variant="p" size="sm" className="footer-text">
                  Don't have an account?{' '}
                  <Link to="/register" className="footer-link">
                    <Text variant="span" size="sm" weight="medium">
                      Create one here
                    </Text>
                  </Link>
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

