import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenueReportContainerComponent } from '../containers/revenue-report-container.component';

@Component({
  selector: 'app-revenue-report',
  standalone: true,
  imports: [CommonModule, RevenueReportContainerComponent],
  templateUrl: './revenue-report.component.html'
})
export class RevenueReportComponent {}
