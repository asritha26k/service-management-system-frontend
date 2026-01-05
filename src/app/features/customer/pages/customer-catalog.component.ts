import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerCatalogContainerComponent } from '../containers/customer-catalog-container.component';

@Component({
  selector: 'app-customer-catalog',
  standalone: true,
  imports: [CommonModule, CustomerCatalogContainerComponent],
  templateUrl: './customer-catalog.component.html'
})
export class CustomerCatalogComponent {}
