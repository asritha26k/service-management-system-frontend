import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthStateService } from '../../../core/services/auth-state.service';
import { LoginResponse, TokenResponse, User } from '../types/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private authState = inject(AuthStateService);
  private router = inject(Router);
  
  // Gateway URL for Identity Service
  private apiUrl = 'http://localhost:8080/identity-service/api/auth'; 

  login(credentials: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          const user: User = {
            userId: response.userId,
            email: (response as any).username || (response as any).email || response.email,
            role: response.role
          };
          this.authState.setSession(response.accessToken, user, response.forcePasswordChange);
        })
      );
  }

  changePassword(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/change-password`, data);
  }

  registerCustomer(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  registerManager(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/register-manager`, data);
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
