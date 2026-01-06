import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CatalogService } from '../services/catalog.service';
import { ServiceCategory } from '../models/catalog.models';
import { alphanumericWithSpacesValidator, noWhitespaceValidator } from '../../../shared/validators/custom-validators';

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
    name: ['', [Validators.required, Validators.minLength(3), alphanumericWithSpacesValidator(), noWhitespaceValidator()]],
    description: ['', [Validators.required, Validators.minLength(10), alphanumericWithSpacesValidator(), noWhitespaceValidator()]]
  });

  isInvalid(field: string) {
    const ctrl = this.createForm.get(field);
    return ctrl?.touched && ctrl?.invalid;
  }

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
    } else {
      this.createForm.markAllAsTouched();
    }
  }

  closeModal() {
    this.showCreateModal = false;
    this.createForm.reset();
  }
}
