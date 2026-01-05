export interface ServiceRequest {
  id: string;
  requestNumber: string;
  customerId: string;
  serviceId: string;

  technicianId?: string;
  status: 'REQUESTED' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CLOSED' | 'CANCELLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  issueDetails: string;
  preferredSchedule: string;
  preferredDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerDetails {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  address: string | null;
}

export interface CreateServiceRequestRequest {
  serviceId: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  preferredDate: string;
  address: string;
}

export interface ServiceRequestResponse extends ServiceRequest {
  serviceName: string;
  serviceDescription?: string;
  basePrice?: number;
  slaHours?: number;
  customerName: string;
  technicianName?: string;
  technicianPhone?: string;
  address: string;
  customerDetails?: CustomerDetails;
}



