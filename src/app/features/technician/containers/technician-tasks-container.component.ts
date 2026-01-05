import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceRequestService } from '../../customer/services/service-request.service';
import { ServiceRequestResponse } from '../../customer/models/service-request.models';
import { NotificationService } from '../../../core/services/notification.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-technician-tasks-list-container',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './technician-tasks-container.component.html'
})
export class TechnicianTasksContainerComponent implements OnInit {
  private requestService = inject(ServiceRequestService);
  private ns = inject(NotificationService);
  
  tasks: ServiceRequestResponse[] = [];
  selectedTask: ServiceRequestResponse | null = null;
  rejectTask: ServiceRequestResponse | null = null;
  rejectReason = '';
  showRejectError = false;
  isLoading = true;

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;
    this.requestService.getTechnicianRequests().subscribe({
      next: (requests) => {
        this.tasks = requests;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load technician tasks', err);
        this.ns.showError('Failed to load tasks. Please try again.');
        this.isLoading = false;
      }
    });
  }

  acceptRequest(task: ServiceRequestResponse) {
    this.requestService.acceptRequest(task.id).subscribe({
      next: () => {
        this.ns.showSuccess('Request accepted successfully!');
        this.loadTasks();
      },
      error: (err) => {
        console.error('Failed to accept request', err);
        this.ns.showError('Failed to accept request. Please try again.');
      }
    });
  }

  openRejectModal(task: ServiceRequestResponse) {
    this.rejectTask = task;
    this.rejectReason = '';
    this.showRejectError = false;
  }

  closeRejectModal() {
    this.rejectTask = null;
    this.rejectReason = '';
    this.showRejectError = false;
  }

  confirmReject() {
    if (!this.rejectReason || this.rejectReason.trim().length === 0) {
      this.showRejectError = true;
      return;
    }

    if (this.rejectTask) {
      this.requestService.rejectRequest(this.rejectTask.id, this.rejectReason).subscribe({
        next: () => {
          this.ns.showSuccess('Request rejected successfully.');
          this.closeRejectModal();
          this.loadTasks();
        },
        error: (err) => {
          console.error('Failed to reject request', err);
          this.ns.showError('Failed to reject request. Please try again.');
        }
      });
    }
  }

  updateStatus(task: ServiceRequestResponse) {
    this.selectedTask = task;
  }

  saveStatus(id: string, status: string) {
    // Use the correct completion endpoint when status is COMPLETED
    if (status === 'COMPLETED') {
      this.requestService.completeRequest(id).subscribe({
        next: () => {
          this.ns.showSuccess('Request completed successfully! Invoice generated.');
          this.selectedTask = null;
          this.loadTasks();
        },
        error: (err) => {
          console.error('Failed to complete request', err);
          this.ns.showError('Failed to complete request. Please try again.');
        }
      });
    } else {
      // For other status changes, use updateStatus
      this.requestService.updateStatus(id, status).subscribe({
        next: () => {
          this.ns.showSuccess('Status updated successfully!');
          this.selectedTask = null;
          this.loadTasks();
        },
        error: (err) => {
          console.error('Failed to update status', err);
          this.ns.showError('Failed to update status. Please try again.');
        }
      });
    }
  }

  getPriorityClass(p: string) {
    switch (p) {
      case 'HIGH': return 'bg-danger';
      case 'MEDIUM': return 'bg-warning';
      case 'LOW': return 'bg-success';
      default: return 'bg-secondary';
    }
  }

  getStatusClass(s: string) {
    switch (s) {
      case 'COMPLETED': return 'bg-success';
      case 'IN_PROGRESS': return 'bg-primary';
      case 'ACCEPTED': return 'bg-primary text-white';
      case 'ASSIGNED': return 'bg-secondary';
      default: return 'bg-light text-muted';
    }
  }
}
