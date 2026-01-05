import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnicianDashboardContainerComponent } from '../containers/technician-dashboard-container.component';

@Component({
  selector: 'app-technician-dashboard',
  standalone: true,
  imports: [CommonModule, TechnicianDashboardContainerComponent],
  templateUrl: './technician-dashboard.component.html'
})
export class TechnicianDashboardComponent {}
