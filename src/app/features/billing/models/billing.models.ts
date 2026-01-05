export interface Invoice {
  id: string;
  customerId: string;
  requestId: string;
  serviceAmount: number;
  taxAmount: number;
  totalAmount: number;
  paymentStatus: 'PENDING' | 'PAID';
  paymentMethod?: string;
  paidAt?: string;
  serviceName?: string;
  createdAt: string;
}

export interface CreateInvoiceRequest {
  requestId: string;
  amount: number;
  dueDate: string;
}

export interface RevenueReport {
  totalRevenue: number;
  monthlyRevenue: { month: string; amount: number }[];
}

export interface MonthlyRevenueReport {
  year: number;
  month: number;
  totalRevenue: number;
  paidInvoiceCount: number;
}
