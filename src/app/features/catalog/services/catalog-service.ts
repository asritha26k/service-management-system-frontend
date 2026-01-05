import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceItemResponse } from '../types/services.model';
import { ServiceCategoryResponse } from '../types/categories.model';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private readonly baseUrl='http://localhost:8080/service-operations-service/api/catalog';
  constructor(private readonly http:HttpClient){};

  getAllServices():Observable<ServiceItemResponse[]>{
return this.http.get<ServiceItemResponse[]>(`${this.baseUrl}/services`);
  }
  getAllCategories():Observable<ServiceCategoryResponse[]>{
return this.http.get<ServiceCategoryResponse[]>(`${this.baseUrl}/categories`);
  }
  getCategoryById(categoryId:string):Observable<ServiceCategoryResponse>{
    return this.http.get<ServiceItemResponse>(`${this.baseUrl}/categories/${categoryId}`);
  }
  getServiceById(serviceId:string):Observable<ServiceItemResponse>{
    return this.http.get<ServiceItemResponse>(`${this.baseUrl}/services/${serviceId}`)
  }
  getServicesByCategoryId(categoryId:string):Observable<ServiceItemResponse[]>{
return this.http.get<ServiceItemResponse[]>(`${this.baseUrl}/services/category/${categoryId}`);
  }


}
