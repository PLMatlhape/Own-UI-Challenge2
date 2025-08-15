import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Text, Button } from '../../index';
import type { User } from '../../index';
import { userAPI, handleAPIError } from '../../services/api';
import './Register.css';

interface RegisterProps {
  onRegister: (user: User) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      // Check if username already exists
      const userExists = await userAPI.checkUsername(username);
      if (userExists) {
        setError('Username already exists');
        return;
      }

      // Create new user via API
      const newUser = await userAPI.createUser({
        username,
        password
      });
      
      onRegister(newUser);
      navigate('/home');
    } catch (err) {
      setError(handleAPIError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      {/* Background with floating shapes */}
      <div className="register-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>

      <div className="register-container">
        <div className="register-content">
          {/* Left side - Welcome content */}
          <div className="welcome-section">
            <div className="welcome-badge">
              <span className="badge-icon">✨</span>
              <span>Join JobTracker</span>
            </div>
            <Text variant="h1" className="welcome-title">
              Start Your
              <span className="title-highlight"> Success Story</span>
            </Text>
            <Text className="welcome-description">
              Transform your job search with intelligent tracking, personalized insights, 
              and seamless organization. Join thousands of professionals already using JobTracker.
            </Text>
            <div className="welcome-features">
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <div className="feature-content">
                  <span className="feature-title">Smart Analytics</span>
                  <span className="feature-desc">Track application progress</span>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🎯</div>
                <div className="feature-content">
                  <span className="feature-title">Goal Tracking</span>
                  <span className="feature-desc">Set and achieve targets</span>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🚀</div>
                <div className="feature-content">
                  <span className="feature-title">Career Growth</span>
                  <span className="feature-desc">Accelerate your journey</span>
                </div>
              </div>
            </div>
            <div className="welcome-stats">
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Happy Users</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Jobs Tracked</span>
              </div>
            </div>
          </div>

          {/* Right side - Register form */}
          <div className="form-section">
            <div className="form-container">
              <div className="form-header">
                <Text variant="h2" className="form-title">
                  Create Account
                </Text>
                <Text className="form-subtitle">
                  Get started with your free JobTracker account
                </Text>
              </div>

              <form onSubmit={handleSubmit} className="register-form">
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
                      placeholder="Choose a username"
                      required
                      disabled={loading}
                      minLength={3}
                      className="form-input"
                    />
                    <div className="input-hint">Minimum 3 characters</div>
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
                      placeholder="Create a password"
                      required
                      disabled={loading}
                      minLength={6}
                      className="form-input"
                    />
                    <div className="input-hint">Minimum 6 characters</div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    <Text variant="label" size="sm" weight="medium">
                      Confirm Password
                    </Text>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      required
                      disabled={loading}
                      minLength={6}
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
                  disabled={!username || !password || !confirmPassword}
                  className="register-button"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>

              <div className="form-footer">
                <div className="footer-divider"></div>
                <Text variant="p" size="sm" className="footer-text">
                  Already have an account?{' '}
                  <Link to="/login" className="footer-link">
                    <Text variant="span" size="sm" weight="medium">
                      Sign in here
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

export default Register;

