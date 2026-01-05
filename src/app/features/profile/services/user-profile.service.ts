import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUserProfileRequest, UserProfileResponse } from '../models/user-profile.models';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private http = inject(HttpClient);
  // Gateway URL for Identity Service
  private apiUrl = 'http://localhost:8080/identity-service/api/users/profile';

  getMyProfile(): Observable<UserProfileResponse> {
    return this.http.get<UserProfileResponse>(this.apiUrl);
  }

  updateMyProfile(data: UpdateUserProfileRequest): Observable<void> {
    return this.http.put<void>(this.apiUrl, data);
  }

  createProfile(data: UpdateUserProfileRequest): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
