import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../admin/services/dashboard.service';
import { TechnicianWorkloadStats } from '../../admin/models/dashboard.models';

@Component({
  selector: 'app-manager-dashboard-container',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './manager-dashboard-container.component.html'
})
export class ManagerDashboardContainerComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  technicianWorkload: TechnicianWorkloadStats | null = null;

  ngOnInit() {
    this.dashboardService.getTechnicianWorkload().subscribe(stats => {
      this.technicianWorkload = stats;
    });
  }
}
