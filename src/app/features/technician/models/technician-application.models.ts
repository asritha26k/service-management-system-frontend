export interface TechnicianApplicationRequest {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  experience: number;
  specialization: string;
  skills: string[];
  certifications?: string;
  previousEmployer?: string;
  workExperienceDetails?: string;
  maxWorkload: number;
  motivation?: string;
  hasVehicle: boolean;
  hasToolkit: boolean;
  availability?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}
