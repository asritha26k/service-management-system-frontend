import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerDashboardContainerComponent } from '../containers/manager-dashboard-container.component';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [CommonModule, ManagerDashboardContainerComponent],
  templateUrl: './manager-dashboard.component.html'
})
export class ManagerDashboardComponent {}
