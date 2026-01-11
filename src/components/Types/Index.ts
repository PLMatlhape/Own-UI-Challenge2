interface Job {
  id: string;
  companyName: string;
  role: string;
  status: 'Applied' | 'Interviewed' | 'Rejected';
  dateApplied: string;
  jobDuties?: string;
  requirements?: string;
  companyAddress?: string;
  contactEmail?: string;
  contactPhone?: string;
  additionalNotes?: string;
}

interface User {
  id: string;
  username: string;
  password: string;
}