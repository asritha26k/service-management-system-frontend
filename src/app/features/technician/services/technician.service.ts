import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface TechnicianSummary {
  id: string;
  userId: string;
  name: string;
  specialization: string;
  skills: string[];
  location: string;
  available: boolean;
  currentWorkload: number;
  maxWorkload: number;
}

export interface TechnicianProfile {
  id: string;
  userId: string;
  email: string;
  name: string;
  phone: string;
  specialization: string;
  experience: number;
  skills: string[];
  location: string;
  available: boolean;
  currentWorkload: number;
  maxWorkload: number;
  createdAt: string;
}

import { TechnicianApplicationRequest } from '../models/technician-application.models';
import { ApplicationRejectionRequest, ApplicationReviewResponse } from '../../manager/models/technician-approval.models';
import { IdMessageResponse } from '../../authentication/types/auth.models';

export interface ApplicationSubmissionResponse {
  id: string;
  fullName: string;
  email: string;
  status: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {
  private http = inject(HttpClient);
  // Gateway URL for Technician Service
  private apiUrl = 'http://localhost:8080/technician-service/api/technicians';

  apply(data: TechnicianApplicationRequest): Observable<ApplicationSubmissionResponse> {
    return this.http.post<ApplicationSubmissionResponse>(`${this.apiUrl}/apply`, data);
  }

  getPendingApplications(): Observable<ApplicationReviewResponse[]> {
    return this.http.get<ApplicationReviewResponse[]>(`${this.apiUrl}/applications/pending`);
  }

  approveApplication(id: string): Observable<IdMessageResponse> {
    return this.http.post<IdMessageResponse>(`${this.apiUrl}/applications/${id}/approve`, {});
  }

  rejectApplication(id: string, reason: string): Observable<IdMessageResponse> {
    const body: ApplicationRejectionRequest = { reason };
    return this.http.post<IdMessageResponse>(`${this.apiUrl}/applications/${id}/reject`, body);
  }

  getAvailableTechnicians(): Observable<TechnicianSummary[]> {
    return this.http.get<TechnicianSummary[]>(`${this.apiUrl}/available`);
  }

  getSuggestedTechnicians(location?: string, skills?: string[]): Observable<TechnicianProfile[]> {
    let url = `${this.apiUrl}/suggestions`;
    const params: string[] = [];
    
    if (location) {
      params.push(`location=${encodeURIComponent(location)}`);
    }
    if (skills && skills.length > 0) {
      params.push(`skills=${encodeURIComponent(skills.join(','))}`);
    }
    
    if (params.length > 0) {
      url += '?' + params.join('&');
    }
    
    return this.http.get<TechnicianProfile[]>(url);
  }

  // Add more methods as needed (get stats, etc)
}
