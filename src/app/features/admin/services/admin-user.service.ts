import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedUserResponse } from '../models/user-management.models';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  private http = inject(HttpClient);
  // Gateway URL for Identity Service
  private apiUrl = 'http://localhost:8080/identity-service/api/users';

  getUsersByRole(role: string, page: number = 0, size: number = 20): Observable<PaginatedUserResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', 'email');

    return this.http.get<PaginatedUserResponse>(`${this.apiUrl}/role/${role}`, { params });
  }
}
