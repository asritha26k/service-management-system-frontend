import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingService } from '../services/billing.service';
import { RevenueReport, MonthlyRevenueReport } from '../models/billing.models';

@Component({
  selector: 'app-revenue-report-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './revenue-report-container.component.html'
})
export class RevenueReportContainerComponent implements OnInit {
  private billingService = inject(BillingService);
  report: RevenueReport | null = null;
  monthlyReports: MonthlyRevenueReport[] = [];

  ngOnInit() {
    this.billingService.getRevenueReport().subscribe(res => {
      this.report = res;
    });
    this.billingService.getMonthlyRevenueReport().subscribe(res => {
      this.monthlyReports = res;
    });
  }

  getMonthName(month: number): string {
    const date = new Date();
    date.setMonth(month - 1);
    return date.toLocaleString('default', { month: 'long' });
  }
}
