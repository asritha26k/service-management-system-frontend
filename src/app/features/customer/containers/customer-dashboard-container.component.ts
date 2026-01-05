import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthStateService } from '../../../core/services/auth-state.service';
import { ServiceRequestService } from '../services/service-request.service';
import { BillingService } from '../../billing/services/billing.service';
import { ServiceRequestResponse } from '../models/service-request.models';
import { Invoice } from '../../billing/models/billing.models';

@Component({
  selector: 'app-customer-dashboard-container',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './customer-dashboard-container.component.html'
})
export class CustomerDashboardContainerComponent implements OnInit {
  authState = inject(AuthStateService);
  private requestService = inject(ServiceRequestService);
  private billingService = inject(BillingService);

  activeRequestsCount = 0;
  pendingInvoicesCount = 0;
  completedRequestsCount = 0;
  totalSpent = 0;
  recentRequests: ServiceRequestResponse[] = [];

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.requestService.getMyRequests().subscribe(requests => {
      this.activeRequestsCount = requests.filter(r => ['REQUESTED', 'ASSIGNED', 'IN_PROGRESS'].includes(r.status)).length;
      this.completedRequestsCount = requests.filter(r => r.status === 'COMPLETED' || r.status === 'CLOSED').length;
      this.recentRequests = requests.slice(0, 4);
    });

    this.billingService.getMyInvoices().subscribe(invoices => {
      this.pendingInvoicesCount = invoices.filter(i => i.paymentStatus === 'PENDING').length;
      this.totalSpent = invoices.filter(i => i.paymentStatus === 'PAID').reduce((sum, i) => sum + i.totalAmount, 0);
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'REQUESTED': return 'bg-secondary-subtle text-secondary';
      case 'ASSIGNED': return 'bg-primary-subtle text-primary';
      case 'IN_PROGRESS': return 'bg-primary-subtle text-primary';
      case 'COMPLETED': return 'bg-success-subtle text-success';
      case 'CANCELLED': return 'bg-danger-subtle text-danger';
      default: return 'bg-secondary-subtle text-secondary';
    }
  }
}
