import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ServiceRequestService } from '../services/service-request.service';
import { ServiceRequestResponse } from '../models/service-request.models';
import { NotificationService } from '../../../core/services/notification.service';
import { CatalogService } from '../../catalog/services/catalog.service';

@Component({
  selector: 'app-my-requests-list-container',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './my-service-requests-container.component.html'
})
export class MyServiceRequestsContainerComponent implements OnInit {
  private requestService = inject(ServiceRequestService);
  private catalogService = inject(CatalogService);
  private ns = inject(NotificationService);
  
  requests: ServiceRequestResponse[] = [];
  sortedRequests: ServiceRequestResponse[] = [];
  serviceMap: Map<string, string> = new Map();
  sortOrder: 'asc' | 'desc' = 'asc';
  
  showModal = false;
  showRescheduleModal = false;
  selectedRequestId: string | null = null;
  newPreferredDate = '';
  minDate = '';

  ngOnInit() {
    this.loadServices();
    this.loadRequests();
    const now = new Date();
    this.minDate = now.toISOString().slice(0, 16);
  }

  loadServices() {
    this.catalogService.getAllServices().subscribe(services => {
      services.forEach(s => this.serviceMap.set(s.id, s.name));
    });
  }

  loadRequests() {
    this.requestService.getMyRequests().subscribe(res => {
      this.requests = res;
      this.sortedRequests = [...res];
      this.applySort('asc'); 
    });
  }
  
  getServiceName(id: string): string {
    return this.serviceMap.get(id) || 'Unknown Service';
  }

  openCancelModal(id: string) {
    this.selectedRequestId = id;
    this.showModal = true;
  }

  openRescheduleModal(id: string) {
    this.selectedRequestId = id;
    this.newPreferredDate = '';
    this.showRescheduleModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.showRescheduleModal = false;
    this.selectedRequestId = null;
    this.newPreferredDate = '';
  }



  confirmCancel() {
    if (this.selectedRequestId) {
      this.requestService.cancelRequest(this.selectedRequestId).subscribe({
        next: () => {
          this.ns.showSuccess('Service request cancelled successfully.');
          this.closeModal();
          this.loadRequests();
        },
        error: () => {
          this.ns.showError('Could not cancel request. It might have been assigned already.');
          this.closeModal();
        }
      });
    }
  }

  confirmReschedule() {
    if (this.selectedRequestId && this.newPreferredDate) {
      const formattedDate = new Date(this.newPreferredDate).toISOString();
      this.requestService.rescheduleRequest(this.selectedRequestId, formattedDate).subscribe({
        next: () => {
          this.ns.showSuccess('Service request rescheduled successfully.');
          this.closeModal();
          this.loadRequests();
        },
        error: (err) => {
          console.error(err);
          const errorMsg = err.error?.message || 'Failed to reschedule request.';
          this.ns.showError(errorMsg);
        }
      });
    }
  }

  sortByStatus() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.applySort(this.sortOrder);
  }

  private applySort(order: 'asc' | 'desc') {
    const statusOrder: { [key: string]: number } = {
      'ACCEPTED': 1,
      'ASSIGNED': 2,
      'REQUESTED': 3,
      'IN_PROGRESS': 4,
      'COMPLETED': 5,
      'CLOSED': 6,
      'CANCELLED': 10
    };

    this.sortedRequests.sort((a, b) => {
      const weightA = statusOrder[a.status] || 99;
      const weightB = statusOrder[b.status] || 99;
      return order === 'asc' ? weightA - weightB : weightB - weightA;
    });
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'HIGH': return 'text-danger fw-bold';
      case 'MEDIUM': return 'text-warning fw-bold';
      case 'LOW': return 'text-success fw-bold';
      default: return 'text-primary';
    }
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
