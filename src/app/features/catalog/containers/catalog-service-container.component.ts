import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CatalogService } from '../services/catalog.service';
import { ServiceCategory, ServiceItem } from '../models/catalog.models';
import { alphanumericWithSpacesValidator, noWhitespaceValidator, urlValidator } from '../../../shared/validators/custom-validators';

@Component({
  selector: 'app-catalog-service-container',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './catalog-service-container.component.html'
})
export class CatalogServiceContainerComponent implements OnInit {
  private catalogService = inject(CatalogService);
  private fb = inject(FormBuilder);

  categories: ServiceCategory[] = [];
  services: ServiceItem[] = [];
  filteredServices: ServiceItem[] = [];
  showCreateModal = false;

  createForm = this.fb.group({
    categoryId: ['', Validators.required],
    name: ['', [Validators.required, Validators.minLength(3), alphanumericWithSpacesValidator(), noWhitespaceValidator()]],
    description: ['', [Validators.required, Validators.minLength(10), alphanumericWithSpacesValidator(), noWhitespaceValidator()]],
    basePrice: [0, [Validators.required, Validators.min(0), Validators.max(999999)]],
    slaHours: [24, [Validators.required, Validators.min(1), Validators.max(720)]],
    estimatedDurationMinutes: [60, [Validators.required, Validators.min(1), Validators.max(1440)]],
    images: this.fb.array([])
  });

  get images() {
    return this.createForm.get('images') as FormArray;
  }

  isInvalid(field: string) {
    const ctrl = this.createForm.get(field);
    return ctrl?.touched && ctrl?.invalid;
  }

  isImageInvalid(index: number, field: string) {
    const ctrl = this.images.at(index).get(field);
    return ctrl?.touched && ctrl?.invalid;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.catalogService.getCategories().subscribe(cats => {
      this.categories = cats;
    });
    this.catalogService.getAllServices().subscribe(srvs => {
      this.services = srvs;
      this.filteredServices = srvs;
    });
  }

  filterByCategory(event: any) {
    const catId = event.target.value;
    if (catId) {
      this.filteredServices = this.services.filter(s => s.categoryId === catId);
    } else {
      this.filteredServices = this.services;
    }
  }

  openCreateModal() {
    this.showCreateModal = true;
    this.images.clear(); // Reset images
  }

  addImage() {
    const imageGroup = this.fb.group({
      url: ['', [Validators.required, urlValidator()]],
      alt: ['', [Validators.required, alphanumericWithSpacesValidator(), noWhitespaceValidator()]]
    });
    this.images.push(imageGroup);
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }

  createService() {
    if (this.createForm.valid) {
      this.catalogService.createService(this.createForm.value as any).subscribe(() => {
        this.loadData();
        this.closeModal();
      });
    } else {
      this.createForm.markAllAsTouched();
      // Also mark all images controls as touched
      this.images.controls.forEach(control => {
        control.markAllAsTouched();
      });
    }
  }

  deleteService(id: string) {
    if (confirm('Are you sure you want to delete this service?')) {
      this.catalogService.deleteService(id).subscribe(() => {
        this.loadData();
      });
    }
  }

  closeModal() {
    this.showCreateModal = false;
    this.createForm.reset({slaHours: 24, basePrice: 0, estimatedDurationMinutes: 60});
    this.images.clear();
  }

  getCategoryName(id: string): string {
    return this.categories.find(c => c.id === id)?.name || 'Unknown';
  }
}
