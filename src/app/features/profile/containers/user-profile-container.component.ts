import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfileService } from '../services/user-profile.service';
import { UserProfileResponse } from '../models/user-profile.models';
import { NotificationService } from '../../../core/services/notification.service';
import { alphaWithSpacesValidator, alphabeticOnlyValidator, addressValidator, noWhitespaceValidator } from '../../../shared/validators/custom-validators';

@Component({
  selector: 'app-user-profile-container',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile-container.component.html'
})
export class UserProfileContainerComponent implements OnInit {
  private fb = inject(FormBuilder);
  private profileService = inject(UserProfileService);
  private ns = inject(NotificationService);

  profile: UserProfileResponse | null = null;
  isLoading = true;
  isEditing = false;
  isSaving = false;
  isNewProfile = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), alphaWithSpacesValidator(), noWhitespaceValidator()]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,12}$')]],
    address: ['', [Validators.required, Validators.minLength(10), addressValidator(), noWhitespaceValidator()]],
    city: ['', [Validators.required, Validators.minLength(2), alphabeticOnlyValidator(), noWhitespaceValidator()]],
    state: ['', [Validators.required, Validators.minLength(2), alphabeticOnlyValidator(), noWhitespaceValidator()]],
    pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
  });

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.isLoading = true;
    this.profileService.getMyProfile().subscribe({
      next: (res) => {
        this.profile = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching profile', err);
      }
    });
  }

  enableEdit(isNew: boolean) {
    this.isEditing = true;
    this.isNewProfile = isNew;
    if (this.profile && !isNew) {
      this.form.patchValue(this.profile);
    } else {
      this.form.reset();
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.isNewProfile = false;
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSaving = true;
      const data = this.form.value as any;

      const req = this.isNewProfile 
        ? this.profileService.createProfile(data)
        : this.profileService.updateMyProfile(data);

      req.subscribe({
        next: () => {
          this.isSaving = false;
          this.isEditing = false;
          this.loadProfile();
          this.ns.showSuccess('Profile saved successfully');
        },
        error: (err) => {
          this.isSaving = false;
          console.error(err);
          this.ns.showError('Failed to save profile');
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
