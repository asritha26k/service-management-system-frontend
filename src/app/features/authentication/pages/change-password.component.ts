import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordFormContainerComponent } from '../containers/change-password-form.component';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ChangePasswordFormContainerComponent],
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent {}
