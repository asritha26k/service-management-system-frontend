import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateServiceRequestRequest, ServiceRequestResponse } from '../models/service-request.models';
import { PagedResponse } from '../../../shared/models/paged-response.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {
  private http = inject(HttpClient);
  // Gateway URL for Service Operations Service
  private apiUrl = 'http://localhost:8080/service-operations-service/api/service-requests';

  createRequest(data: CreateServiceRequestRequest): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getMyRequests(): Observable<ServiceRequestResponse[]> {
    return this.http.get<ServiceRequestResponse[]>(`${this.apiUrl}/my-requests`);
  }

  getAllRequests(page: number = 0, size: number = 20, sort: string = 'createdAt'): Observable<PagedResponse<ServiceRequestResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<PagedResponse<ServiceRequestResponse>>(this.apiUrl, { params });
  }

  getRequestById(id: string): Observable<ServiceRequestResponse> {
    return this.http.get<ServiceRequestResponse>(`${this.apiUrl}/${id}`);
  }

  cancelRequest(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/cancel`, {});
  }

  // Technician methods
  getTechnicianRequests(): Observable<ServiceRequestResponse[]> {
    return this.http.get<ServiceRequestResponse[]>(`${this.apiUrl}/technician/my-requests/with-customer`);
  }


  updateStatus(id: string, status: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/status`, { status });
  }

  // Complete request - use this for technician completion
  // This calls the correct endpoint that handles workload, invoice, and notifications
  completeRequest(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/complete`, {});
  }

  acceptRequest(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/accept`, {});
  }

  rejectRequest(id: string, reason: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/reject`, { action: 'REJECT', reason });
  }

  rescheduleRequest(id: string, preferredDate: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/reschedule`, { preferredDate });
  }

  assign(requestId: string, technicianId: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${requestId}/assign`, { technicianId });
  }


}
