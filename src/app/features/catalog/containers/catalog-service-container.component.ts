import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CatalogService } from '../services/catalog.service';
import { ServiceCategory, ServiceItem } from '../models/catalog.models';

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
    name: ['', Validators.required],
    description: ['', Validators.required],
    basePrice: [0, [Validators.required, Validators.min(0)]],
    slaHours: [24, [Validators.required, Validators.min(1)]],
    estimatedDurationMinutes: [60, [Validators.required, Validators.min(1)]],
    images: this.fb.array([])
  });

  get images() {
    return this.createForm.get('images') as FormArray;
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
      url: ['', Validators.required],
      alt: ['', Validators.required]
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
