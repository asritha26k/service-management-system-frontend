import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-technician-dashboard-container',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './technician-dashboard-container.component.html'
})
export class TechnicianDashboardContainerComponent {}
