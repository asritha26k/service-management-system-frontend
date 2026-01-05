import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ServiceRequestService } from '../../../customer/services/service-request.service';
import { ServiceRequestResponse } from '../../../customer/models/service-request.models';

@Component({
  selector: 'app-manager-requests-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './manager-requests-list.component.html'
})
export class ManagerRequestsListComponent implements OnInit {
  private requestService = inject(ServiceRequestService);
  
  requests: ServiceRequestResponse[] = [];
  filteredRequests: ServiceRequestResponse[] = [];

  // Pagination state
  currentPage: number = 0;
  pageSize: number = 20;
  totalElements: number = 0;
  totalPages: number = 0;

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests(page: number = 0) {
    this.requestService.getAllRequests(page, this.pageSize).subscribe(response => {
      this.requests = response.content;
      this.filteredRequests = response.content;
      this.currentPage = response.pageNumber;
      this.totalElements = response.totalElements;
      this.totalPages = response.totalPages;
    });
  }

  filterStatus(status: string) {
    if (status) {
      this.filteredRequests = this.requests.filter(r => r.status === status);
    } else {
      this.filteredRequests = this.requests;
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'REQUESTED': return 'bg-secondary';
      case 'ASSIGNED': return 'bg-primary';
      case 'IN_PROGRESS': return 'bg-primary';
      case 'COMPLETED': return 'bg-success';
      case 'CLOSED': return 'bg-secondary';
      case 'CANCELLED': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
}


