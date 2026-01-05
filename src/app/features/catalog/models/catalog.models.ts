export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
}

export interface ServiceImage {
  url: string;
  alt: string;
}

export interface ServiceItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  basePrice: number;
  slaHours: number;
  estimatedDurationMinutes?: number;
  images?: ServiceImage[];
  active?: boolean;
  createdAt?: string;
}

export interface CreateCategoryRequest {
  name: string;
  description: string;
}

export interface CreateServiceItemRequest {
  categoryId: string;
  name: string;
  description: string;
  basePrice: number;
  slaHours: number;
  estimatedDurationMinutes: number;
  images?: ServiceImage[];
}
