import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-form.component.html'
})
export class LoginFormContainerComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  isLoading = false;
  errorMessage = '';

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.authService.login(this.loginForm.value as any).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.forcePasswordChange) {
            this.router.navigate(['/change-password']);
          } else {
            this.redirectUser();
          }
        },
        error: (err) => {
          this.isLoading = false;
          // Extract user-friendly message from backend error response
          if (err.error?.message) {
            this.errorMessage = err.error.message;
          } else if (err.status === 400) {
            this.errorMessage = 'Invalid email or password. Please check your credentials and try again.';
          } else if (err.status === 401) {
            this.errorMessage = 'Authentication failed. Invalid email or password.';
          } else if (err.status === 0) {
            this.errorMessage = 'Cannot connect to server. Please check your internet connection.';
          } else {
            this.errorMessage = 'Login failed. Please try again later.';
          }
          console.error('Login error:', err);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  private redirectUser() {
    const role = this.authService.getUserRole();
    switch (role) {
      case 'ADMIN':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'MANAGER':
        this.router.navigate(['/manager/dashboard']);
        break;
      case 'TECHNICIAN':
        this.router.navigate(['/technician/dashboard']);
        break;
      case 'CUSTOMER':
        this.router.navigate(['/customer/dashboard']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }
}
