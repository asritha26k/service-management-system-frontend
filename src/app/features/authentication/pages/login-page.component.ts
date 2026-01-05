import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormContainerComponent } from '../containers/login-form.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, LoginFormContainerComponent],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {}
