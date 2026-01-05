import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashboardContainerComponent } from '../containers/customer-dashboard-container.component';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, CustomerDashboardContainerComponent],
  templateUrl: './customer-dashboard.component.html'
})
export class CustomerDashboardComponent {}
