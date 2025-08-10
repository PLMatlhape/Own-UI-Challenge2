export interface Job {
  id: string;
  companyName: string;
  role: string;
  status: 'Applied' | 'Pending' | 'Rejected';
  dateApplied: string;
  description?: string;
  requirements?: string;
  duties?: string;
  contactDetails?: string;
  address?: string;
  notes?: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface JobContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, 'id'>) => void;
  updateJob: (id: string, job: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  filteredJobs: Job[];
}

