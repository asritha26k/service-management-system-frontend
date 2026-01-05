export interface DashboardSummaryResponse {
  serviceRequestsByStatus: Record<string, number>;
  serviceRequestsByCategory: Record<string, number>;
  totalActiveRequests: number;
  totalCompletedRequests: number;
  activeTechnicians: number;
  averageResolutionTimeHours: number;
  monthlyRevenue: number;
  totalRevenue: number;
  pendingPayments: number;
}

export interface MonthlyRevenueReport {
  year: number;
  month: number;
  totalRevenue: number;
  paidInvoiceCount: number;
}

export interface RevenueSummary {
  totalServiceAmount: number;
  totalTaxAmount: number;
  totalRevenue: number;
  invoiceCount: number;
  paidCount: number;
}

export interface ServiceStat {
  serviceId: string;
  serviceName: string;
  requestCount: number;
}

export interface CategoryStat {
  categoryId: string;
  categoryName: string;
  totalRequests: number;
  services: ServiceStat[];
}

export interface CategoryStatsResponse {
  categories: CategoryStat[];
  totalCategories: number;
  totalRequests: number;
}

export interface TechnicianWorkloadStats {
  totalTechnicians: number;
  availableTechnicians: number;
  averageWorkloadRatio: number;
}
