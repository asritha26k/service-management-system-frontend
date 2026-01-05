import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CatalogService } from '../services/catalog.service';
import { ServiceCategory } from '../models/catalog.models';

@Component({
  selector: 'app-catalog-category-container',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './catalog-category-container.component.html'
})
export class CatalogCategoryContainerComponent implements OnInit {
  private catalogService = inject(CatalogService);
  private fb = inject(FormBuilder);

  categories: ServiceCategory[] = [];
  showCreateModal = false;

  createForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.catalogService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  createCategory() {
    if (this.createForm.valid) {
      this.catalogService.createCategory(this.createForm.value as any).subscribe(() => {
        this.loadCategories();
        this.closeModal();
      });
    }
  }

  closeModal() {
    this.showCreateModal = false;
    this.createForm.reset();
  }
}
