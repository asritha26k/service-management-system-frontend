import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice, CreateInvoiceRequest, RevenueReport, MonthlyRevenueReport } from '../models/billing.models';
import { IdMessageResponse } from '../../authentication/types/auth.models';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/service-operations-service/api/billing';

  createInvoice(data: CreateInvoiceRequest): Observable<IdMessageResponse> {
    return this.http.post<IdMessageResponse>(`${this.apiUrl}/invoices`, data);
  }

  getInvoiceById(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/invoices/${id}`);
  }

  getMyInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}/my-invoices`);
  }

  payInvoice(id: string): Observable<IdMessageResponse> {
    return this.http.post<IdMessageResponse>(`${this.apiUrl}/invoices/${id}/pay`, {});
  }

  // Manager/Admin methods
  getRevenueReport(): Observable<RevenueReport> {
    return this.http.get<RevenueReport>(`${this.apiUrl}/reports/revenue`);
  }

  getMonthlyRevenueReport(): Observable<MonthlyRevenueReport[]> {
    return this.http.get<MonthlyRevenueReport[]>(`${this.apiUrl}/reports/revenue/monthly`);
  }
}
