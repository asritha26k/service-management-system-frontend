import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthStateService } from '../../../core/services/auth-state.service';

@Component({
  selector: 'app-home-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-container.component.html'
})
export class HomeContainerComponent implements OnInit {
  private authState = inject(AuthStateService);
  private router = inject(Router);

  ngOnInit() {
    this.redirect();
  }

  private redirect() {
    const role = this.authState.userRole() as any;
    
    // Simulate a small delay for smoother transition if needed, 
    // but usually direct redirect is better.
    setTimeout(() => {
        switch (role) {
          case 'ADMIN':
            this.router.navigate(['/admin/dashboard']);
            break;
          case 'CUSTOMER':
            this.router.navigate(['/customer/dashboard']);
            break;
          case 'TECHNICIAN':
            this.router.navigate(['/technician/dashboard']);
            break;
          case 'MANAGER':
            this.router.navigate(['/manager/dashboard']);
            break;
          default:
            this.router.navigate(['/login']);
            break;
        }
    }, 500);
  }
}
