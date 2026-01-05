export interface ApplicationReviewResponse {
  id: string;
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
  certifications: string | null;
  maxWorkload: number;
  hasVehicle: boolean | null;
  hasToolkit: boolean | null;
  status: string; // PENDING, APPROVED, REJECTED
  createdAt: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
  rejectionReason: string | null;
}

export interface ApplicationRejectionRequest {
  reason: string;
}
