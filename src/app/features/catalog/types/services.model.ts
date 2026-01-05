export interface ServiceItemImagePayload {
  url: string;
  alt: string;
}
export interface ServiceItemResponse {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  basePrice: number;
  estimatedDurationMinutes: number;
  slaHours: number;
  images: ServiceItemImagePayload[];
  active: boolean;
  createdAt: string;
}

