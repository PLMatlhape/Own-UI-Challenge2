import React from 'react';
import { Link } from 'react-router-dom';
import { Text, Button } from '../../index';
import './Landing.css';

const Landing: React.FC = () => {
  return (
    <div className="landing-page">
      {/* Floating Hero Section */}
      <section className="floating-hero">
        <div className="hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
        
        <div className="hero-container">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="badge-icon">⚡</span>
              <span>Smart Job Tracking</span>
            </div>
            <Text variant="h1" className="hero-title">
              Your Career Journey
              <span className="title-highlight"> Simplified</span>
            </Text>
            <Text className="hero-description">
              Transform how you manage job applications with intelligent tracking, 
              real-time insights, and seamless organization that adapts to your workflow.
            </Text>
            <div className="hero-stats">
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
            <div className="hero-actions">
              <Link to="/register">
                <Button variant="primary" size="lg" className="cta-primary">
                  🚀 Start Free Trial
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="cta-secondary">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hero-right">
            <div className="dashboard-preview">
              <div className="preview-header">
                <div className="preview-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="preview-title">JobTracker Dashboard</span>
              </div>
              <div className="preview-content">
                <div className="preview-stats">
                  <div className="mini-stat">
                    <div className="mini-stat-value">24</div>
                    <div className="mini-stat-label">Applied</div>
                  </div>
                  <div className="mini-stat">
                    <div className="mini-stat-value">8</div>
                    <div className="mini-stat-label">Interviews</div>
                  </div>
                  <div className="mini-stat">
                    <div className="mini-stat-value">3</div>
                    <div className="mini-stat-label">Offers</div>
                  </div>
                </div>
                <div className="preview-jobs">
                  <div className="preview-job">
                    <div className="job-icon">💼</div>
                    <div className="job-details">
                      <div className="job-title">Senior Developer</div>
                      <div className="job-company">TechCorp</div>
                    </div>
                    <div className="job-status status-interview">Interview</div>
                  </div>
                  <div className="preview-job">
                    <div className="job-icon">🏢</div>
                    <div className="job-details">
                      <div className="job-title">Product Manager</div>
                      <div className="job-company">InnovateLab</div>
                    </div>
                    <div className="job-status status-applied">Applied</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features Grid */}
      <section className="features-showcase">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <span className="badge-icon">✨</span>
              <span>Features</span>
            </div>
            <Text variant="h2" className="section-title">
              Everything You Need to
              <span className="title-accent"> Succeed</span>
            </Text>
          </div>
          
          <div className="features-grid">
            <div className="feature-card card-primary">
              <div className="card-glow"></div>
              <div className="card-content">
                <div className="feature-icon icon-large">🎯</div>
                <Text variant="h3" className="feature-title">Smart Tracking</Text>
                <Text className="feature-description">
                  AI-powered insights track your application progress and suggest optimal timing for follow-ups.
                </Text>
                <div className="feature-preview">
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                  <span className="progress-text">Application Progress: 75%</span>
                </div>
              </div>
            </div>
            
            <div className="feature-card card-secondary">
              <div className="card-glow"></div>
              <div className="card-content">
                <div className="feature-icon icon-large">⚡</div>
                <Text variant="h3" className="feature-title">Lightning Fast</Text>
                <Text className="feature-description">
                  Add applications in seconds with our streamlined interface and auto-fill capabilities.
                </Text>
                <div className="speed-indicator">
                  <div className="speed-lines">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="speed-text">&lt; 30s per application</span>
                </div>
              </div>
            </div>
            
            <div className="feature-card card-accent">
              <div className="card-glow"></div>
              <div className="card-content">
                <div className="feature-icon icon-large">�</div>
                <Text variant="h3" className="feature-title">Deep Analytics</Text>
                <Text className="feature-description">
                  Understand your job search patterns with detailed analytics and performance metrics.
                </Text>
                <div className="analytics-preview">
                  <div className="chart-bars">
                    <div className="bar" style={{height: '60%'}}></div>
                    <div className="bar" style={{height: '80%'}}></div>
                    <div className="bar" style={{height: '45%'}}></div>
                    <div className="bar" style={{height: '90%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="testimonials-section">
        <div className="container">
          <div className="testimonials-header">
            <Text variant="h2" className="testimonials-title">
              Loved by Job Seekers Worldwide
            </Text>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <Text className="testimonial-text">
                  "JobTracker helped me land my dream job! The organization features are incredible."
                </Text>
                <div className="testimonial-author">
                  <div className="author-avatar">👩‍💼</div>
                  <div className="author-info">
                    <div className="author-name">Sarah Chen</div>
                    <div className="author-role">Software Engineer</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <Text className="testimonial-text">
                  "Finally, a tool that understands the job search process. Game-changer!"
                </Text>
                <div className="testimonial-author">
                  <div className="author-avatar">👨‍💻</div>
                  <div className="author-info">
                    <div className="author-name">Marcus Johnson</div>
                    <div className="author-role">Product Manager</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <Text className="testimonial-text">
                  "The analytics feature showed me exactly where to improve. Got hired within weeks!"
                </Text>
                <div className="testimonial-author">
                  <div className="author-avatar">👩‍🎨</div>
                  <div className="author-info">
                    <div className="author-name">Emma Rodriguez</div>
                    <div className="author-role">UX Designer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with Animation */}
      <section className="final-cta">
        <div className="cta-background">
          <div className="cta-particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
        </div>
        
        <div className="cta-container">
          <div className="cta-content">
            <Text variant="h2" className="cta-title">
              Ready to Transform Your
              <span className="cta-highlight"> Job Search?</span>
            </Text>
            <Text className="cta-description">
              Join thousands of successful job seekers who've streamlined their career journey with JobTracker.
            </Text>
            
            <div className="cta-actions">
              <Link to="/register">
                <Button variant="primary" size="xl" className="cta-main">
                  🎯 Get Started - It's Free
                </Button>
              </Link>
              <Text className="cta-note">
                No credit card required • 14-day free trial
              </Text>
            </div>
            
            <div className="trust-indicators">
              <div className="trust-item">
                <span className="trust-icon">🔒</span>
                <span>Secure & Private</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">⭐</span>
                <span>5-Star Rated</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">🚀</span>
                <span>Used by 10K+ Professionals</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

