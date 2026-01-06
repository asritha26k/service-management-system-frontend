import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceCategory, ServiceItem, CreateCategoryRequest, CreateServiceItemRequest } from '../models/catalog.models';
import { IdMessageResponse } from '../../authentication/types/auth.models';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private http = inject(HttpClient);
  // Gateway URL for Service Operations Service
  private apiUrl = 'http://localhost:8080/service-operations-service/api/catalog';

  // Categories
  getCategories(): Observable<ServiceCategory[]> {
    return this.http.get<ServiceCategory[]>(`${this.apiUrl}/categories`);
  }

  getCategoryById(id: string): Observable<ServiceCategory> {
    return this.http.get<ServiceCategory>(`${this.apiUrl}/categories/${id}`);
  }

  createCategory(data: CreateCategoryRequest): Observable<IdMessageResponse> {
    return this.http.post<IdMessageResponse>(`${this.apiUrl}/categories`, data);
  }

  // Services
  getAllServices(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(`${this.apiUrl}/services`);
  }

  getServicesByCategory(categoryId: string): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(`${this.apiUrl}/services/category/${categoryId}`);
  }

  getServiceById(id: string): Observable<ServiceItem> {
    return this.http.get<ServiceItem>(`${this.apiUrl}/services/${id}`);
  }

  createService(data: CreateServiceItemRequest): Observable<IdMessageResponse> {
    return this.http.post<IdMessageResponse>(`${this.apiUrl}/services`, data);
  }

  deleteService(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/services/${id}`);
  }
}
