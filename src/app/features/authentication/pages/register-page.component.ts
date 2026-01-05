import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormContainerComponent } from '../containers/register-form.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, RegisterFormContainerComponent],
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent {}
