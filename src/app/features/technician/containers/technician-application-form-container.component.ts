import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { TechnicianService } from '../services/technician.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-technician-application-form-container',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './technician-application-form-container.component.html'
})
export class TechnicianApplicationFormContainerComponent {
  private fb = inject(FormBuilder);
  private techService = inject(TechnicianService);
  private router = inject(Router);
  private ns = inject(NotificationService);

  isSubmitting = false;

  form = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,12}$')]],
    address: ['', [Validators.required, Validators.minLength(10)]],
    city: ['', [Validators.required, Validators.minLength(2)]],
    state: ['', [Validators.required, Validators.minLength(2)]],
    zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    experience: [1, [Validators.required, Validators.min(1)]],
    specialization: ['', Validators.required],
    skills: this.fb.array<string>([]), 
    certifications: ['', Validators.minLength(3)],
    previousEmployer: ['', Validators.minLength(2)],
    workExperienceDetails: ['', Validators.minLength(10)],
    maxWorkload: [5, [Validators.required, Validators.min(1), Validators.max(20)]],
    hasVehicle: [false],
    hasToolkit: [false],
    availability: ['', Validators.minLength(3)],
    emergencyContactName: ['', [Validators.minLength(2), Validators.pattern('^[a-zA-Z\\s]*$')]],
    emergencyContactPhone: ['', Validators.pattern('^[0-9]{10,12}$')],
    motivation: ['', Validators.minLength(10)]
  });

  get skillsFormArray() {
    return this.form.get('skills') as FormArray;
  }

  isInvalid(field: string) {
    const ctrl = this.form.get(field);
    return ctrl?.touched && ctrl?.invalid;
  }

  updateSkills(value: string) {
    this.skillsFormArray.clear();
    const skills = value.split(',').map(s => s.trim()).filter(s => s.length > 0);
    skills.forEach(s => this.skillsFormArray.push(this.fb.control(s)));
  }

  onSubmit() {
    if (this.skillsFormArray.length === 0) {
        this.ns.showWarning('Please add at least one skill.');
        return;
    }

    if (this.form.valid) {
      this.isSubmitting = true;
      this.techService.apply(this.form.value as any).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.ns.showSuccess('Application submitted successfully! We will contact you shortly.');
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error(err);
          this.ns.showError('Failed to submit application. Please try again.');
        }
      });
    } else {
      this.form.markAllAsTouched();
      this.ns.showWarning('Please correct the errors in the form.');
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
