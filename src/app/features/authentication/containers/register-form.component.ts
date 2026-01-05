import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

/** Custom validator to check if passwords match */
const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value
    ? { passwordMismatch: true }
    : null;
};

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-form.component.html'
})
export class RegisterFormContainerComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private ns = inject(NotificationService);

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required, 
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]],
    confirmPassword: ['', Validators.required],
    address: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    roles: ['CUSTOMER']
  }, { validators: passwordMatchValidator });

  isLoading = false;
  errorMessage = '';

  // Getters for password validation UI logic
  // NOTE: The class check logic in template was inverted (active voice vs passive state).
  // Correct logic: if check passes -> green (check-circle), else -> red (x-circle)
  
  get passControl() { return this.registerForm.get('password'); }
  
  get hasMinLength() { return this.passControl?.errors?.['minlength'] || this.passControl?.errors?.['required']; }
  get hasUpperCase() { return !/[A-Z]/.test(this.passControl?.value || ''); }
  get hasLowerCase() { return !/[a-z]/.test(this.passControl?.value || ''); }
  get hasNumber() { return !/\d/.test(this.passControl?.value || ''); }
  get hasSpecialChar() { return !/[@$!%*?&]/.test(this.passControl?.value || ''); }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      // Exclude confirmPassword from payload
      const { confirmPassword, ...registerData } = this.registerForm.value;
      
      this.authService.registerCustomer(registerData).subscribe({
        next: () => {
          this.isLoading = false;
          this.ns.showSuccess('Registration successful! Please login.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Registration failed. Try again.';
          console.error(err);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
