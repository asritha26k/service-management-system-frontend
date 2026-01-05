import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CatalogService } from '../../catalog/services/catalog.service';
import { ServiceCategory, ServiceItem } from '../../catalog/models/catalog.models';
import { AuthStateService } from '../../../core/services/auth-state.service';

@Component({
  selector: 'app-customer-catalog-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-catalog-container.component.html'
})
export class CustomerCatalogContainerComponent implements OnInit {
  private catalogService = inject(CatalogService);
  private router = inject(Router);
  authState = inject(AuthStateService);

  categories: ServiceCategory[] = [];
  services: ServiceItem[] = [];
  filteredServices: ServiceItem[] = [];
  selectedCategoryId = '';

  ngOnInit() {
    this.catalogService.getCategories().subscribe(res => this.categories = res);
    this.catalogService.getAllServices().subscribe(res => {
      this.services = res;
      this.filteredServices = res;
    });
  }

  selectCategory(id: string) {
    this.selectedCategoryId = id;
    if (id) {
      this.filteredServices = this.services.filter(s => s.categoryId === id);
    } else {
      this.filteredServices = this.services;
    }
  }

  getCategoryName(id: string) {
    return this.categories.find(c => c.id === id)?.name;
  }

  raiseRequest(service: ServiceItem) {
    if (!this.authState.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/customer/create-request'], { queryParams: { serviceId: service.id } });
  }
}
