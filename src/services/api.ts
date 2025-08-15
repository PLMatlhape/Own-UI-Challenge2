import axios from 'axios';
import type { Job, User } from '../types';

const API_BASE_URL = 'http://localhost:3001';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API functions
export const userAPI = {
  // Get all users
  getUsers: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  // Find user by username and password
  login: async (username: string, password: string): Promise<User | null> => {
    const response = await api.get(`/users?username=${username}&password=${password}`);
    return response.data.length > 0 ? response.data[0] : null;
  },

  // Check if username exists
  checkUsername: async (username: string): Promise<boolean> => {
    const response = await api.get(`/users?username=${username}`);
    return response.data.length > 0;
  },

  // Create new user
  createUser: async (userData: Omit<User, 'id'>): Promise<User> => {
    const response = await api.post('/users', {
      ...userData,
      id: Date.now().toString(), // Generate ID
    });
    return response.data;
  },
};

// Job API functions
export const jobAPI = {
  // Get jobs by user ID
  getUserJobs: async (userId: string): Promise<Job[]> => {
    const response = await api.get(`/jobs?userId=${userId}`);
    return response.data;
  },

  // Get single job by ID
  getJob: async (jobId: string): Promise<Job | null> => {
    try {
      const response = await api.get(`/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      return null;
    }
  },

  // Create new job
  createJob: async (jobData: Omit<Job, 'id'> & { userId: string }): Promise<Job> => {
    const response = await api.post('/jobs', {
      ...jobData,
      id: Date.now().toString(), // Generate ID
    });
    return response.data;
  },

  // Update job
  updateJob: async (jobId: string, jobData: Partial<Job>): Promise<Job> => {
    const response = await api.patch(`/jobs/${jobId}`, jobData);
    return response.data;
  },

  // Delete job
  deleteJob: async (jobId: string): Promise<void> => {
    await api.delete(`/jobs/${jobId}`);
  },
};

// Error handler for API calls
export const handleAPIError = (error: any): string => {
  if (error.response) {
    // Server responded with error status
    return `Server error: ${error.response.status} ${error.response.statusText}`;
  } else if (error.request) {
    // Request was made but no response received
    return 'Network error: Unable to connect to server. Make sure JSON Server is running.';
  } else {
    // Something else happened
    return `Error: ${error.message}`;
  }
};
