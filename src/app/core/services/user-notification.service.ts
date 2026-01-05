import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AppNotification {
  id: string;
  userId: string;
  type: string;
  title: string;
  subject: string;
  message: string;
  read: boolean;
  sentAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserNotificationService {
  private http = inject(HttpClient);
  // endpoint for the notificatoin service
  private baseUrl = 'http://localhost:8080/notification-service/api/notifications';

  getUserNotifications(): Observable<AppNotification[]> {
    return this.http.get<AppNotification[]>(`${this.baseUrl}/user`);
  }

  markAsRead(id: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/read`, {});
  }
}
