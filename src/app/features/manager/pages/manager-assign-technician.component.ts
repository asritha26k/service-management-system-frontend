import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServiceRequestService } from '../../customer/services/service-request.service';
import { ServiceRequestResponse } from '../../customer/models/service-request.models';
import { TechnicianService, TechnicianSummary, TechnicianProfile } from '../../technician/services/technician.service';
import { CatalogService } from '../../catalog/services/catalog.service';
import { ServiceItem } from '../../catalog/models/catalog.models';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-manager-assign-technician',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './manager-assign-technician.component.html'
})
export class ManagerAssignTechnicianComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private requestService = inject(ServiceRequestService);
  private technicianService = inject(TechnicianService);
  private catalogService = inject(CatalogService);
  private ns = inject(NotificationService);

  request: ServiceRequestResponse | null = null;
  serviceDetail: ServiceItem | null = null;
  technicians: TechnicianSummary[] = [];
  suggestions: TechnicianProfile[] = [];
  filteredTechnicians: TechnicianSummary[] = [];
  filteredSuggestions: TechnicianProfile[] = [];

  isLoading = true;
  isLoadingService = false;
  isAssigning = false;
  isLoadingSuggestions = false;
  
  selectedTechnicianId: string | null = null;
  searchTerm = '';
  activeTab: 'suggestions' | 'available' = 'suggestions';

  ngOnInit() {
    const requestId = this.route.snapshot.paramMap.get('id');
    if (requestId) {
      this.loadData(requestId);
    } else {
      this.isLoading = false;
    }
  }

  loadData(requestId: string) {
    this.isLoading = true;
    this.requestService.getRequestById(requestId).subscribe({
      next: (req) => {
        this.request = req;
        this.loadServiceDetails(req.serviceId);
        this.loadTechnicians();
      },
      error: () => {
        this.isLoading = false;
        this.ns.showError('Failed to load request details');
      }
    });
  }

  loadServiceDetails(serviceId: string) {
    this.isLoadingService = true;
    this.catalogService.getServiceById(serviceId).subscribe({
      next: (service) => {
        this.serviceDetail = service;
        this.isLoadingService = false;
        // Load suggestions after service details are available
        this.loadSuggestions();
      },
      error: () => {
        this.isLoadingService = false;
        // Don't error block, just show failed state
      }
    });
  }

  loadSuggestions() {
    this.isLoadingSuggestions = true;
    
    // Extract location from request address
    const location = this.request?.address || undefined;
    
    // Extract skills from service name (e.g., "Plumbing", "Electrical")
    const skills = this.serviceDetail?.name ? [this.serviceDetail.name] : undefined;
    
    this.technicianService.getSuggestedTechnicians(location, skills).subscribe({
      next: (suggestions) => {
        this.suggestions = suggestions;
        this.filteredSuggestions = suggestions;
        this.isLoadingSuggestions = false;
      },
      error: () => {
        this.isLoadingSuggestions = false;
        this.suggestions = [];
        this.filteredSuggestions = [];
      }
    });
  }

  loadTechnicians() {
    this.technicianService.getAvailableTechnicians().subscribe({
      next: (techs) => {
        this.technicians = techs;
        this.filteredTechnicians = techs;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.ns.showError('Failed to load technicians');
      }
    });
  }

  filterTechnicians() {
    if (!this.searchTerm) {
      this.filteredTechnicians = this.technicians;
      this.filteredSuggestions = this.suggestions;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredTechnicians = this.technicians.filter(t => 
        t.name?.toLowerCase().includes(term) || 
        t.specialization?.toLowerCase().includes(term)
      );
      this.filteredSuggestions = this.suggestions.filter(t => 
        t.name?.toLowerCase().includes(term) || 
        t.specialization?.toLowerCase().includes(term)
      );
    }
  }

  selectTechnician(id: string) {
    this.selectedTechnicianId = id;
  }

  confirmAssignment() {
    if (!this.request || !this.selectedTechnicianId) return;

    this.isAssigning = true;
    this.requestService.assign(this.request.id, this.selectedTechnicianId).subscribe({
      next: () => {
        this.ns.showSuccess('Technician assigned successfully');
        this.router.navigate(['/manager/requests']);
      },
      error: () => {
        this.isAssigning = false;
        this.ns.showError('Failed to assign technician');
      }
    });
  }

  getWorkloadBadgeClass(current: number, max: number): string {
    const ratio = current / max;
    if (ratio >= 0.8) return 'bg-danger';
    if (ratio >= 0.5) return 'bg-warning';
    return 'bg-success';
  }

  switchTab(tab: 'suggestions' | 'available') {
    this.activeTab = tab;
  }
}
