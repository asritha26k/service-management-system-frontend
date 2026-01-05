import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { CategoryStatsResponse, DashboardSummaryResponse, MonthlyRevenueReport, RevenueSummary, TechnicianWorkloadStats } from '../models/dashboard.models';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard-container',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard-container.component.html'
})
export class AdminDashboardContainerComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  
  summary: DashboardSummaryResponse | null = null;
  revenueSummary: RevenueSummary | null = null;

  monthlyRevenue: MonthlyRevenueReport[] = [];
  categoryStats: CategoryStatsResponse | null = null;

  technicianWorkload: TechnicianWorkloadStats | null = null;
  isLoading = true;

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.isLoading = true;
    forkJoin({
      summary: this.dashboardService.getSummary(),
      revenueSummary: this.dashboardService.getRevenueSummary(),
      monthlyRevenue: this.dashboardService.getMonthlyRevenue(),

      categoryStats: this.dashboardService.getCategoryStats(),
      technicianWorkload: this.dashboardService.getTechnicianWorkload()
    }).subscribe({
      next: (res) => {
        this.summary = res.summary;
        this.revenueSummary = res.revenueSummary;
        this.monthlyRevenue = res.monthlyRevenue;
        this.summary = res.summary;
        this.revenueSummary = res.revenueSummary;
        this.monthlyRevenue = res.monthlyRevenue;
        this.categoryStats = res.categoryStats;
        this.technicianWorkload = res.technicianWorkload;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load dashboard data', err);
        this.isLoading = false;
      }
    });
  }

  getStatusEntries() {
    if (!this.summary?.serviceRequestsByStatus) return [];
    return Object.entries(this.summary.serviceRequestsByStatus).map(([key, value]) => ({ key, value }));
  }
}
