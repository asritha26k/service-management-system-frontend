import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogCategoryContainerComponent } from '../containers/catalog-category-container.component';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [CommonModule, CatalogCategoryContainerComponent],
  templateUrl: './category-management.component.html'
})
export class CategoryManagementComponent {}
