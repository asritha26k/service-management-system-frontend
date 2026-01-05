import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryStatsResponse, DashboardSummaryResponse, MonthlyRevenueReport, RevenueSummary, TechnicianWorkloadStats } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  // Gateway URL for Service Operations Service
  private apiUrl = 'http://localhost:8080/service-operations-service/api';

  getSummary(): Observable<DashboardSummaryResponse> {
    return this.http.get<DashboardSummaryResponse>(`${this.apiUrl}/dashboard/summary`);
  }

  getMonthlyRevenue(): Observable<MonthlyRevenueReport[]> {
    return this.http.get<MonthlyRevenueReport[]>(`${this.apiUrl}/billing/reports/revenue/monthly`);
  }

  getRevenueSummary(): Observable<RevenueSummary> {
    return this.http.get<RevenueSummary>(`${this.apiUrl}/billing/reports/revenue`);
  }

  getCategoryStats(): Observable<CategoryStatsResponse> {
    return this.http.get<CategoryStatsResponse>(`${this.apiUrl}/dashboard/category-stats`);
  }

  getTechnicianWorkload(): Observable<TechnicianWorkloadStats> {
    return this.http.get<TechnicianWorkloadStats>(`${this.apiUrl}/dashboard/technician-workload`);
  }
}

