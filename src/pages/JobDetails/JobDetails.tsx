import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Text, Button } from '../../index';
import type { Job, User } from '../../index';
import './JobDetails.css';

interface JobDetailsProps {
  user: User | null;
}

const JobDetails: React.FC<JobDetailsProps> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      const storedJobs = localStorage.getItem(`jobTracker_jobs_${user.id}`);
      if (storedJobs && id) {
        const jobs: Job[] = JSON.parse(storedJobs);
        const foundJob = jobs.find(j => j.id === id);
        setJob(foundJob || null);
      }
    }
    setLoading(false);
  }, [id, user]);

  const getStatusClass = (status: string) => {
    return `status-${status.toLowerCase().replace(/\s+/g, '-')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="job-details-page">
        <div className="container">
          <div className="loading-state">
            <Text variant="p" size="lg" color="secondary" align="center">
              Loading job details...
            </Text>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="job-details-page">
        <div className="container">
          <div className="not-found-state">
            <Text variant="h1" size="2xl" weight="bold" color="primary" align="center">
              Job Not Found
            </Text>
            <Text variant="p" size="lg" color="secondary" align="center">
              The job application you're looking for doesn't exist.
            </Text>
            <div className="not-found-actions">
              <Link to="/home">
                <Button variant="primary" size="lg">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="job-details-page">
      <div className="container">
        <div className="page-container">
          <div className="page-header">
            <div className="header-navigation">
              <Button variant="ghost" size="sm" onClick={() => navigate('/home')}>
                ← Back to Dashboard
              </Button>
            </div>
            
            <div className="job-header">
              <div className="job-title-section">
                <Text variant="h1" size="3xl" weight="bold" color="primary">
                  {job.role}
                </Text>
                <Text variant="h2" size="xl" weight="medium" color="secondary">
                  {job.companyName}
                </Text>
              </div>
              
              <div className={`job-status-badge ${getStatusClass(job.status)}`}>
                <Text variant="span" size="sm" weight="bold">
                  {job.status}
                </Text>
              </div>
            </div>
          </div>

          <div className="job-details-content">
            <div className="details-grid">
              <div className="detail-card">
                <Text variant="h3" size="lg" weight="semibold" color="primary" className="detail-title">
                  Application Details
                </Text>
                
                <div className="detail-item">
                  <Text variant="span" size="sm" weight="medium" color="secondary">
                    Date Applied:
                  </Text>
                  <Text variant="span" size="md" color="primary">
                    {formatDate(job.dateApplied)}
                  </Text>
                </div>
                
                <div className="detail-item">
                  <Text variant="span" size="sm" weight="medium" color="secondary">
                    Status:
                  </Text>
                  <div className={`status-inline ${getStatusClass(job.status)}`}>
                    <Text variant="span" size="sm" weight="medium">
                      {job.status}
                    </Text>
                  </div>
                </div>
              </div>

              {job.description && (
                <div className="detail-card">
                  <Text variant="h3" size="lg" weight="semibold" color="primary" className="detail-title">
                    Job Description
                  </Text>
                  <Text variant="p" size="md" color="secondary" className="detail-content">
                    {job.description}
                  </Text>
                </div>
              )}

              {job.requirements && (
                <div className="detail-card">
                  <Text variant="h3" size="lg" weight="semibold" color="primary" className="detail-title">
                    Requirements
                  </Text>
                  <Text variant="p" size="md" color="secondary" className="detail-content">
                    {job.requirements}
                  </Text>
                </div>
              )}

              {job.duties && (
                <div className="detail-card">
                  <Text variant="h3" size="lg" weight="semibold" color="primary" className="detail-title">
                    Job Duties
                  </Text>
                  <Text variant="p" size="md" color="secondary" className="detail-content">
                    {job.duties}
                  </Text>
                </div>
              )}

              {job.contactDetails && (
                <div className="detail-card">
                  <Text variant="h3" size="lg" weight="semibold" color="primary" className="detail-title">
                    Contact Details
                  </Text>
                  <Text variant="p" size="md" color="secondary" className="detail-content">
                    {job.contactDetails}
                  </Text>
                </div>
              )}

              {job.address && (
                <div className="detail-card">
                  <Text variant="h3" size="lg" weight="semibold" color="primary" className="detail-title">
                    Company Address
                  </Text>
                  <Text variant="p" size="md" color="secondary" className="detail-content">
                    {job.address}
                  </Text>
                </div>
              )}

              {job.notes && (
                <div className="detail-card">
                  <Text variant="h3" size="lg" weight="semibold" color="primary" className="detail-title">
                    Notes
                  </Text>
                  <Text variant="p" size="md" color="secondary" className="detail-content">
                    {job.notes}
                  </Text>
                </div>
              )}
            </div>

            <div className="job-actions">
              <Link to="/home">
                <Button variant="secondary" size="lg">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

