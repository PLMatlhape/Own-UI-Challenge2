import React, { useState, useEffect } from 'react';
import { Text, Button } from '../../index';
import type { Job } from '../../index';
import './Home.css';

const Home: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    status: 'Applied' as Job['status'],
    dateApplied: new Date().toISOString().split('T')[0],
    description: '',
    requirements: '',
    duties: '',
    contactDetails: '',
    address: '',
    notes: ''
  });

  // Calculate stats
  const stats = {
    totalApplied: jobs.length,
    pending: jobs.filter(job => job.status === 'Pending').length,
    applied: jobs.filter(job => job.status === 'Applied').length,
    rejected: jobs.filter(job => job.status === 'Rejected').length
  };

  // Load jobs from localStorage
  useEffect(() => {
    const storedJobs = localStorage.getItem('jobTracker_jobs');
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
  }, []);

  // Save jobs to localStorage
  const saveJobs = (updatedJobs: Job[]) => {
    setJobs(updatedJobs);
    localStorage.setItem('jobTracker_jobs', JSON.stringify(updatedJobs));
  };

  // Get status display class
  const getStatusClass = (status: Job['status']) => {
    return `status-${status.toLowerCase().replace(/\s+/g, '-')}`;
  };

  // Update job status (cycle through: Applied -> Pending -> Rejected -> Applied)
  const updateJobStatus = (jobId: string) => {
    const updatedJobs = jobs.map(job => {
      if (job.id === jobId) {
        let newStatus: Job['status'];
        switch (job.status) {
          case 'Applied':
            newStatus = 'Pending';
            break;
          case 'Pending':
            newStatus = 'Rejected';
            break;
          case 'Rejected':
            newStatus = 'Applied';
            break;
          default:
            newStatus = 'Applied';
        }
        return { ...job, status: newStatus };
      }
      return job;
    });
    saveJobs(updatedJobs);
  };

  // Delete job
  const deleteJob = (jobId: string) => {
    if (confirm('Are you sure you want to delete this job application?')) {
      const updatedJobs = jobs.filter(job => job.id !== jobId);
      saveJobs(updatedJobs);
    }
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit new job
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName.trim() || !formData.role.trim()) {
      alert('Company name and role are required!');
      return;
    }

    const newJob: Job = {
      id: Date.now().toString(),
      ...formData
    };
    
    saveJobs([...jobs, newJob]);
    setShowAddForm(false);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      companyName: '',
      role: '',
      status: 'Applied',
      dateApplied: new Date().toISOString().split('T')[0],
      description: '',
      requirements: '',
      duties: '',
      contactDetails: '',
      address: '',
      notes: ''
    });
  };

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="dashboard">
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-number">{stats.totalApplied}</div>
          <div className="stat-label">Total Applied</div>
        </div>
        <div className="stat-card applied">
          <div className="stat-number">{stats.applied}</div>
          <div className="stat-label">Applied</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card rejected">
          <div className="stat-number">{stats.rejected}</div>
          <div className="stat-label">Rejected</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="search-section">
        <div className="search-controls">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="All">All Status</option>
            <option value="Applied">Applied</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          <Button 
            variant="primary" 
            onClick={() => setShowAddForm(true)}
            className="add-job-btn"
          >
            + Add Job
          </Button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="jobs-section">
        <div className="jobs-header">
          <Text variant="h2">Your Job Applications</Text>
        </div>
        
        <div className="jobs-section">
          {filteredJobs.length === 0 ? (
            <div className="empty-state">
              <Text variant="h3">No jobs found</Text>
              <Text>Start by adding your first job application!</Text>
            </div>
          ) : (
            <div className="jobs-grid">
              {filteredJobs.map((job) => (
                <div key={job.id} className="job-card">
                  <div className="job-header">
                    <div className="job-info">
                      <Text variant="h3" className="job-title">{job.role}</Text>
                      <Text className="job-company">{job.companyName}</Text>
                    </div>
                    <button 
                      className={`job-status ${getStatusClass(job.status)} status-clickable`}
                      onClick={() => updateJobStatus(job.id)}
                      title="Click to change status"
                    >
                      {job.status}
                    </button>
                  </div>
                  
                  <div className="job-content">
                    <Text className="job-date">Applied: {formatDate(job.dateApplied)}</Text>
                    
                    {job.description && (
                      <div className="job-description-section">
                        <Text className="job-description">
                          {job.description}
                        </Text>
                      </div>
                    )}
                    
                    {job.requirements && (
                      <div className="job-requirements-section">
                        <Text className="section-label">Requirements:</Text>
                        <Text className="job-requirements">
                          {job.requirements}
                        </Text>
                      </div>
                    )}
                  </div>
                  
                  <div className="job-footer">
                    <div className="job-details">
                      {job.address && (
                        <Text className="job-location">📍 {job.address}</Text>
                      )}
                      {job.contactDetails && (
                        <Text className="job-contact">📞 {job.contactDetails}</Text>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteJob(job.id)}
                      className="delete-btn"
                    >
                      🗑️ Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Job Form Modal */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <Text variant="h2">Add New Job Application</Text>
              <button 
                className="close-btn"
                onClick={() => setShowAddForm(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="job-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter company name"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Job Role *</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter job role"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Date Applied</label>
                  <input
                    type="date"
                    name="dateApplied"
                    value={formData.dateApplied}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group full-width">
                  <label className="form-label">Job Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter job description"
                    rows={3}
                  />
                </div>
                
                <div className="form-group full-width">
                  <label className="form-label">Requirements</label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder="Enter job requirements"
                    rows={3}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Contact Details</label>
                  <input
                    type="text"
                    name="contactDetails"
                    value={formData.contactDetails}
                    onChange={handleInputChange}
                    placeholder="Email or phone"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Company address"
                  />
                </div>
                
                <div className="form-group full-width">
                  <label className="form-label">Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Additional notes"
                    rows={2}
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary"
                >
                  Add Job
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
