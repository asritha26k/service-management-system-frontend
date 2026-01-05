import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardContainerComponent } from '../containers/admin-dashboard-container.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, AdminDashboardContainerComponent],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent {}

