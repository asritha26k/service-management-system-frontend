import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ServiceRequestService } from '../services/service-request.service';
import { CatalogService } from '../../catalog/services/catalog.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ServiceCategory, ServiceItem } from '../../catalog/models/catalog.models';
import { CreateServiceRequestRequest } from '../models/service-request.models';

@Component({
  selector: 'app-create-service-request-container',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-service-request-container.component.html'
})
export class CreateServiceRequestContainerComponent implements OnInit {
  private fb = inject(FormBuilder);
  private requestService = inject(ServiceRequestService);
  private catalogService = inject(CatalogService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private ns = inject(NotificationService);

  categories: ServiceCategory[] = [];
  services: ServiceItem[] = [];
  filteredServices: ServiceItem[] = [];
  preSelectedService: ServiceItem | null = null;
  isLoading = false;
  minDate = '';

  requestForm = this.fb.group({
    serviceId: ['', Validators.required],
    street: ['', [Validators.required, Validators.minLength(5)]],
    city: ['', [Validators.required, Validators.minLength(2)]],
    state: ['', [Validators.required, Validators.minLength(2)]],
    zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
    priority: ['MEDIUM', Validators.required],
    preferredDate: ['', Validators.required]
  });

  ngOnInit() {
    this.catalogService.getCategories().subscribe(res => this.categories = res);
    this.catalogService.getAllServices().subscribe(res => {
      this.services = res;
      
      // Check for pre-selected service from query params
      this.route.queryParams.subscribe(params => {
        const serviceId = params['serviceId'];
        if (serviceId) {
          this.preSelectedService = this.services.find(s => s.id === serviceId) || null;
          if (this.preSelectedService) {
            this.requestForm.patchValue({ serviceId: serviceId });
          }
        }
      });
    });
    
    // Set min date to current date-time in ISO format for the input
    const now = new Date();
    this.minDate = now.toISOString().slice(0, 16); 
  }

  onCategoryChange(event: any) {
    const catId = event.target.value;
    if (catId) {
      this.filteredServices = this.services.filter(s => s.categoryId === catId);
    } else {
      this.filteredServices = [];
    }
    this.requestForm.patchValue({ serviceId: '' });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      this.isLoading = true;
      
      const formVal = this.requestForm.value;
      const fullAddress = `${formVal.street}, ${formVal.city}, ${formVal.state} ${formVal.zipCode}`;
      
      const payload = {
        serviceId: formVal.serviceId,
        priority: formVal.priority,
        preferredDate: new Date(formVal.preferredDate!).toISOString(),
        address: fullAddress
      };

      this.requestService.createRequest(payload as CreateServiceRequestRequest).subscribe({
        next: () => {
          this.isLoading = false;
          this.ns.showSuccess('Service Request Created Successfully!');
          this.router.navigate(['/customer/requests']);
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
          this.ns.showError('Failed to create request.');
        }
      });
    } else {
      this.requestForm.markAllAsTouched();
    }
  }
}
