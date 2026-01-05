import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface TechnicianSummary {
  id: string;
  userId: string;
  name: string; // Enriched?
  specialization: string;
  available: boolean;

  currentWorkload: number;
  maxWorkload: number;
  location?: string;
}

import { TechnicianApplicationRequest } from '../models/technician-application.models';
import { ApplicationRejectionRequest, ApplicationReviewResponse } from '../../manager/models/technician-approval.models';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {
  private http = inject(HttpClient);
  // Gateway URL for Technician Service
  private apiUrl = 'http://localhost:8080/technician-service/api/technicians';

  apply(data: TechnicianApplicationRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/apply`, data);
  }

  getPendingApplications(): Observable<ApplicationReviewResponse[]> {
    return this.http.get<ApplicationReviewResponse[]>(`${this.apiUrl}/applications/pending`);
  }

  approveApplication(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/applications/${id}/approve`, {});
  }

  rejectApplication(id: string, reason: string): Observable<any> {
    const body: ApplicationRejectionRequest = { reason };
    return this.http.post(`${this.apiUrl}/applications/${id}/reject`, body);
  }

  getAvailableTechnicians(): Observable<TechnicianSummary[]> {
    return this.http.get<TechnicianSummary[]>(`${this.apiUrl}/available`);
  }

  // Add more methods as needed (get stats, etc)
}
