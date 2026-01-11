import React, { useState, useEffect } from 'react';
import { Text, Button } from '../../index';
import type { Job, User } from '../../index';
import './Home.css';

interface HomeProps {
  user: User | null;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'date' | 'company' | 'role' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  
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

  
  const stats = {
    totalApplied: jobs.length,
    pending: jobs.filter(job => job.status === 'Pending').length,
    applied: jobs.filter(job => job.status === 'Applied').length,
    rejected: jobs.filter(job => job.status === 'Rejected').length
  };

  // Load jobs from localStorage when component mounts
  useEffect(() => {
    const loadJobs = () => {
      if (user?.id) {
        setLoading(true);
        setError('');
        try {
          const storedJobs = localStorage.getItem(`jobs_${user.id}`);
          if (storedJobs) {
            setJobs(JSON.parse(storedJobs));
          }
        } catch (err) {
          console.error('Failed to load jobs:', err);
          setError('Failed to load jobs from storage');
        } finally {
          setLoading(false);
        }
      }
    };

    loadJobs();
  }, [user]);

  // Save job to localStorage
  const saveJob = (jobData: Omit<Job, 'id'>) => {
    if (!user?.id) return;

    try {
      const newJob = { ...jobData, id: Date.now().toString(), userId: user.id };
      const updatedJobs = [...jobs, newJob];
      setJobs(updatedJobs);
      localStorage.setItem(`jobs_${user.id}`, JSON.stringify(updatedJobs));
      return newJob;
    } catch (err) {
      console.error('Failed to save job:', err);
      setError('Failed to save job');
    }
  };

  // Update job in localStorage
  const updateJob = (jobId: string, updates: Partial<Job>) => {
    if (!user?.id) return;
    
    try {
      const updatedJobs = jobs.map(job => job.id === jobId ? { ...job, ...updates } : job);
      setJobs(updatedJobs);
      localStorage.setItem(`jobs_${user.id}`, JSON.stringify(updatedJobs));
    } catch (err) {
      console.error('Failed to update job:', err);
      setError('Failed to update job');
    }
  };

  // Delete job from localStorage
  const removeJob = (jobId: string) => {
    if (!user?.id) return;
    
    try {
      const updatedJobs = jobs.filter(job => job.id !== jobId);
      setJobs(updatedJobs);
      localStorage.setItem(`jobs_${user.id}`, JSON.stringify(updatedJobs));
    } catch (err) {
      console.error('Failed to delete job:', err);
      setError('Failed to delete job');
    }
  };

  
  const getStatusClass = (status: Job['status']) => {
    return `status-${status.toLowerCase().replace(/\s+/g, '-')}`;
  };

  // Update job status
  const updateJobStatus = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

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
    
    updateJob(jobId, { status: newStatus });
  };

  // Delete job
  const deleteJob = (jobId: string) => {
    if (confirm('Are you sure you want to delete this job application?')) {
      removeJob(jobId);
    }
  };

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName.trim() || !formData.role.trim()) {
      setError('Company name and role are required!');
      return;
    }

    if (!user?.id) {
      setError('User not authenticated');
      return;
    }

    const jobData = {
      ...formData,
      userId: user.id
    };
    
    await saveJob(jobData);
    setShowAddForm(false);
    resetForm();
    setError(''); // Clear any previous errors
    setSuccessMessage('Job application added successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Handle edit job
  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      companyName: job.companyName,
      role: job.role,
      status: job.status,
      dateApplied: job.dateApplied,
      description: job.description || '',
      requirements: job.requirements || '',
      duties: job.duties || '',
      contactDetails: job.contactDetails || '',
      address: job.address || '',
      notes: job.notes || ''
    });
    setShowEditForm(true);
  };

  // Handle edit form submission
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName.trim() || !formData.role.trim()) {
      setError('Company name and role are required!');
      return;
    }

    if (!editingJob) return;

    await updateJob(editingJob.id, formData);
    setShowEditForm(false);
    setEditingJob(null);
    resetForm();
    setError('');
    setSuccessMessage('Job application updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  
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

  
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort filtered jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime();
        break;
      case 'company':
        comparison = a.companyName.localeCompare(b.companyName);
        break;
      case 'role':
        comparison = a.role.localeCompare(b.role);
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  
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
      {/* Success Message */}
      {successMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#10b981',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span>✓</span>
          <Text variant="p" size="sm" color="white">
            {successMessage}
          </Text>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#ef4444',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          <Text variant="p" size="sm" color="white">
            {error}
          </Text>
          <button 
            onClick={() => setError('')}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              marginLeft: '10px',
              cursor: 'pointer',
              fontSize: '18px'
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Loading Display */}
      {loading && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '20px',
          borderRadius: '8px',
          zIndex: 1000
        }}>
          <Text variant="p" size="lg" color="white">
            Loading...
          </Text>
        </div>
      )}
      {/* Background with floating shapes */}
      <div className="dashboard-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
          <div className="shape shape-6"></div>
        </div>
      </div>

      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-welcome">
            <Text variant="h1" className="dashboard-title">
              Welcome back to
              <span className="title-highlight"> JobTracker</span>
            </Text>
            <Text className="dashboard-subtitle">
              Track your career journey with intelligent insights and seamless organization
            </Text>
          </div>
          <div className="header-actions">
            <Button 
              onClick={() => setShowAddForm(true)}
              className="add-job-btn primary-gradient"
            >
              <span className="btn-icon">+</span>
              Add New Job
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-section">
        <Text variant="h2" className="section-title">
          Application Overview
        </Text>
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-number">{stats.totalApplied}</div>
              <div className="stat-label">Total Applied</div>
            </div>
            <div className="stat-trend">+{stats.totalApplied > 0 ? Math.round(stats.totalApplied * 0.1) : 0} this month</div>
          </div>
          <div className="stat-card applied">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <div className="stat-number">{stats.applied}</div>
              <div className="stat-label">Applied</div>
            </div>
            <div className="stat-trend">Active applications</div>
          </div>
          <div className="stat-card pending">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <div className="stat-number">{stats.pending}</div>
              <div className="stat-label">Pending</div>
            </div>
            <div className="stat-trend">Awaiting response</div>
          </div>
          <div className="stat-card rejected">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <div className="stat-number">{stats.rejected}</div>
              <div className="stat-label">Rejected</div>
            </div>
            <div className="stat-trend">Learning opportunities</div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="search-section">
        <div className="section-header">
          <Text variant="h2" className="section-title">
            Your Applications
          </Text>
          <div className="search-controls">
            <div className="search-wrapper">
              <div className="search-icon">🔍</div>
              <input
                type="text"
                placeholder="Search jobs by company or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                title="Search jobs by company name or role"
              />
            </div>
            <div className="filter-wrapper">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
                title="Filter jobs by status"
              >
                <option value="All">All Status</option>
                <option value="Applied">Applied</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="sort-wrapper">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'company' | 'role' | 'status')}
                className="sort-select"
                title="Sort jobs by field"
              >
                <option value="date">Sort by Date</option>
                <option value="company">Sort by Company</option>
                <option value="role">Sort by Role</option>
                <option value="status">Sort by Status</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="sort-order-btn"
                title={`Sort order: ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="jobs-section">
        {sortedJobs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <Text variant="h3" className="empty-title">No applications found</Text>
            <Text className="empty-description">
              {searchTerm || statusFilter !== 'All' 
                ? 'Try adjusting your search or filter criteria' 
                : 'Start your job search journey by adding your first application!'
              }
            </Text>
            {!searchTerm && statusFilter === 'All' && (
              <Button 
                onClick={() => setShowAddForm(true)}
                className="empty-cta"
              >
                Add Your First Job
              </Button>
            )}
          </div>
        ) : (
          <div className="jobs-grid">
            {sortedJobs.map((job, index) => (
              <div 
                key={job.id} 
                className={`job-card job-card-${index}`}
              >
                <div className="job-header">
                  <div className="job-info">
                    <Text variant="h3" className="job-title">{job.role}</Text>
                    <Text className="job-company">{job.companyName}</Text>
                    <div className="job-meta">
                      <span className="job-date">
                        <span className="date-icon">📅</span>
                        Applied {formatDate(job.dateApplied)}
                      </span>
                    </div>
                  </div>
                  <div className="job-actions">
                    <button 
                      className={`job-status ${getStatusClass(job.status)} status-clickable`}
                      onClick={() => updateJobStatus(job.id)}
                      title="Click to change status"
                    >
                      <span className="status-dot"></span>
                      {job.status}
                    </button>
                  </div>
                </div>
                
                <div className="job-content">
                  {job.description && (
                    <div className="job-description-section">
                      <Text className="job-description">
                        {job.description.length > 150 
                          ? `${job.description.substring(0, 150)}...` 
                          : job.description
                        }
                      </Text>
                    </div>
                  )}
                  
                  {job.requirements && (
                    <div className="job-requirements-section">
                      <Text className="section-label">Requirements:</Text>
                      <Text className="job-requirements">
                        {job.requirements.length > 100 
                          ? `${job.requirements.substring(0, 100)}...` 
                          : job.requirements
                        }
                      </Text>
                    </div>
                  )}
                </div>
                
                <div className="job-footer">
                  <div className="job-details">
                    {job.address && (
                      <Text className="job-location">
                        <span className="detail-icon">📍</span>
                        {job.address}
                      </Text>
                    )}
                    {job.contactDetails && (
                      <Text className="job-contact">
                        <span className="detail-icon">📞</span>
                        {job.contactDetails}
                      </Text>
                    )}
                  </div>
                  <div className="job-footer-actions">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEdit(job)}
                      className="edit-btn"
                    >
                      <span className="btn-icon">✏️</span>
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteJob(job.id)}
                      className="delete-btn"
                    >
                      <span className="btn-icon">🗑️</span>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
                    title="Select job application status"
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
                    title="Select date when you applied"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Job Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Brief description of the role..."
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Requirements</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Key requirements and qualifications..."
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Key Duties</label>
                <textarea
                  name="duties"
                  value={formData.duties}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Main responsibilities..."
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Contact Details</label>
                <input
                  type="text"
                  name="contactDetails"
                  value={formData.contactDetails}
                  onChange={handleInputChange}
                  placeholder="HR contact, email, phone..."
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Company Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Company location..."
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Additional notes, interview dates, etc..."
                />
              </div>
              
              <div className="form-actions">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Add Job Application
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Job Form Modal */}
      {showEditForm && editingJob && (
        <div className="modal-overlay" onClick={() => { setShowEditForm(false); setEditingJob(null); resetForm(); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <Text variant="h2">Edit Job Application</Text>
              <button 
                className="close-btn"
                onClick={() => { setShowEditForm(false); setEditingJob(null); resetForm(); }}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="job-form">
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
                    title="Select job application status"
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
                    title="Select date when you applied"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Job Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Brief description of the role..."
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Requirements</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Key requirements and qualifications..."
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Key Duties</label>
                <textarea
                  name="duties"
                  value={formData.duties}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Main responsibilities..."
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Contact Details</label>
                <input
                  type="text"
                  name="contactDetails"
                  value={formData.contactDetails}
                  onChange={handleInputChange}
                  placeholder="HR contact, email, phone..."
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Company Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Company location..."
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Additional notes, interview dates, etc..."
                />
              </div>
              
              <div className="form-actions">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => { setShowEditForm(false); setEditingJob(null); resetForm(); }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Save Changes
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
