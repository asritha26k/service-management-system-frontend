import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-change-password-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password-form.component.html'
})
export class ChangePasswordFormContainerComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private ns = inject(NotificationService);

  isForced = true;
  isLoading = false;

  form = this.fb.group({
    currentPassword: ['', [Validators.required, Validators.minLength(6)]],
    newPassword: ['', [
      Validators.required, 
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(g: any) {
    return g.get('newPassword').value === g.get('confirmPassword').value
       ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      this.authService.changePassword(this.form.value as any).subscribe({
        next: () => {
          this.ns.showSuccess('Password changed successfully. Please login again.');
          this.authService.logout();
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
          this.ns.showError('Failed to change password. Please check your current password.');
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
