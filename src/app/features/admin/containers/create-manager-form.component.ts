import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../authentication/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-create-manager-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-manager-form.component.html'
})
export class CreateManagerFormContainerComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private ns = inject(NotificationService);

  isSubmitting = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
  });

  isInvalid(field: string) {
    const ctrl = this.form.get(field);
    return ctrl?.touched && ctrl?.invalid;
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      const requestData = {
        ...this.form.value,
        role: 'MANAGER'
      };
      
      this.authService.registerManager(requestData as any).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.ns.showSuccess('Service Manager created successfully!');
          this.router.navigate(['/admin/dashboard']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error(err);
          this.ns.showError('Failed to create manager.');
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  goBack() {
    this.router.navigate(['/admin/dashboard']);
  }
}
