import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TechnicianService } from '../../../technician/services/technician.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { ApplicationReviewResponse } from '../../models/technician-approval.models';

@Component({
  selector: 'app-technician-approvals-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './technician-approvals-list.component.html'
})
export class TechnicianApprovalsListComponent implements OnInit {
  private techService = inject(TechnicianService);
  private ns = inject(NotificationService);

  applications: ApplicationReviewResponse[] = [];
  isLoading = true;
  isProcessing = false;

  showRejectModal = false;
  showApproveModal = false;
  selectedApp: ApplicationReviewResponse | null = null;
  rejectionReason = '';

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.isLoading = true;
    this.techService.getPendingApplications().subscribe({
      next: (res) => {
        this.applications = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  initiateApprove(app: ApplicationReviewResponse) {
    this.selectedApp = app;
    this.showApproveModal = true;
  }

  confirmApprove() {
    if (!this.selectedApp) return;
    
    this.isProcessing = true;
    this.techService.approveApplication(this.selectedApp.id).subscribe({
      next: () => {
        this.isProcessing = false;
        this.closeModal();
        this.ns.showSuccess('Application approved!');
        this.loadApplications();
      },
      error: (err) => {
        this.isProcessing = false;
        console.error(err);
        this.ns.showError('Failed to approve.');
      }
    });
  }

  initiateReject(app: ApplicationReviewResponse) {
    this.selectedApp = app;
    this.rejectionReason = '';
    this.showRejectModal = true;
  }

  closeModal() {
    this.showRejectModal = false;
    this.showApproveModal = false;
    this.selectedApp = null;
    this.rejectionReason = '';
  }

  reject() {
    if (!this.selectedApp || !this.rejectionReason.trim()) return;

    this.isProcessing = true;
    this.techService.rejectApplication(this.selectedApp.id, this.rejectionReason).subscribe({
      next: () => {
        this.isProcessing = false;
        this.closeModal();
        this.ns.showSuccess('Application rejected successfully.');
        this.loadApplications();
      },
      error: (err) => {
        this.isProcessing = false;
        console.error(err);
        this.ns.showError('Failed to reject.');
      }
    });
  }
}
