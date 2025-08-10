import React from 'react';
import { Link } from 'react-router-dom';
import { Text, Button } from '../../index';
import type { Job } from '../../index';
import './JobCard.css';

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onEdit, onDelete }) => {
  const getStatusClass = (status: string) => {
    return `status-${status.toLowerCase().replace(/\s+/g, '-')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-info">
          <Text variant="h3" size="lg" weight="semibold" color="primary">
            {job.role}
          </Text>
          <Text variant="p" size="md" weight="medium" color="secondary">
            {job.companyName}
          </Text>
        </div>
        <div className={`job-status ${getStatusClass(job.status)}`}>
          <Text variant="span" size="sm" weight="medium">
            {job.status}
          </Text>
        </div>
      </div>
      
      <div className="job-card-body">
        <div className="job-date">
          <Text variant="span" size="sm" color="muted">
            Applied: {formatDate(job.dateApplied)}
          </Text>
        </div>
        
        {job.description && (
          <div className="job-description">
            <Text variant="p" size="sm" color="secondary">
              {job.description.length > 100 
                ? `${job.description.substring(0, 100)}...` 
                : job.description
              }
            </Text>
          </div>
        )}
      </div>
      
      <div className="job-card-actions">
        <Link to={`/job/${job.id}`}>
          <Button variant="ghost" size="sm">
            View Details
          </Button>
        </Link>
        <Button variant="outline" size="sm" onClick={() => onEdit(job)}>
          Edit
        </Button>
        <Button variant="error" size="sm" onClick={() => onDelete(job.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
