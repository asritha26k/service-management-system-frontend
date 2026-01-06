import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthStateService } from '../../../core/services/auth-state.service';
import { LoginResponse, TokenResponse, User, LoginRequest, ChangePasswordRequest, RegisterCustomerRequest, RegisterManagerRequest, MessageResponse, IdMessageResponse } from '../types/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private authState = inject(AuthStateService);
  private router = inject(Router);
  
  // Gateway URL for Identity Service
  private apiUrl = 'http://localhost:8080/identity-service/api/auth'; 

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          const user: User = {
            userId: response.userId,
            email: response.email,
            role: response.role
          };
          this.authState.setSession(response.accessToken, user, response.forcePasswordChange);
        })
      );
  }

  changePassword(data: ChangePasswordRequest): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(`${this.apiUrl}/change-password`, data);
  }

  registerCustomer(data: RegisterCustomerRequest): Observable<IdMessageResponse> {
    return this.http.post<IdMessageResponse>(`${this.apiUrl}/register`, data);
  }

  registerManager(data: RegisterManagerRequest): Observable<IdMessageResponse> {
    return this.http.post<IdMessageResponse>(`${this.apiUrl}/admin/register-manager`, data);
  }

  logout() {
    // Call backend to invalidate session (best effort)
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => {
        this.authState.logout();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Backend logout failed', err);
        this.authState.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  getUserRole(): string | undefined {
    return this.authState.userRole();
  }
}
