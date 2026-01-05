import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListContainerComponent } from '../containers/invoice-list-container.component';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, InvoiceListContainerComponent],
  templateUrl: './invoice-list.component.html'
})
export class InvoiceListComponent {}
