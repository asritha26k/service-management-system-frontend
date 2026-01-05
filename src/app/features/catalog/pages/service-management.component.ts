import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogServiceContainerComponent } from '../containers/catalog-service-container.component';

@Component({
  selector: 'app-service-management',
  standalone: true,
  imports: [CommonModule, CatalogServiceContainerComponent],
  templateUrl: './service-management.component.html'
})
export class ServiceManagementComponent {}
