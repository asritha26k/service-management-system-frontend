import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingService } from '../services/billing.service';
import { Invoice } from '../models/billing.models';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-invoice-list-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-list-container.component.html'
})
export class InvoiceListContainerComponent implements OnInit {
  private billingService = inject(BillingService);
  private ns = inject(NotificationService);
  invoices: Invoice[] = [];
  selectedInvoice: Invoice | null = null;

  ngOnInit() {
    this.loadInvoices();
  }

  loadInvoices() {
    this.billingService.getMyInvoices().subscribe(res => {
      this.invoices = res;
    });
  }

  openPaymentModal(invoice: Invoice) {
    this.selectedInvoice = invoice;
  }

  closePaymentModal() {
    this.selectedInvoice = null;
  }

  confirmPayment() {
    if (this.selectedInvoice) {
      this.billingService.payInvoice(this.selectedInvoice.id).subscribe({
        next: () => {
          this.ns.showSuccess('Payment successful!');
          this.closePaymentModal();
          this.loadInvoices();
        },
        error: () => {
          this.ns.showError('Payment failed. Please try again.');
        }
      });
    }
  }
}
