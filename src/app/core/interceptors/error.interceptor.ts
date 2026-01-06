import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

//centralized error handling without try catch in every other service
//runs for every http request
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const ns = inject(NotificationService);

  return next(req).pipe(
    //runs when backend throws 4xx or 5xx (any http failure)
    catchError((error) => {
      console.error('HTTP Error:', error);
      
      // Skip showing global notification for auth endpoints that handle errors locally
      const skipNotificationUrls = ['/logout', '/login', '/register', '/change-password'];
      const shouldSkipNotification = skipNotificationUrls.some(url => req.url.includes(url));
      
      if (!shouldSkipNotification) {
        // Extract user-friendly error message from backend
        let errorMsg = 'An error occurred. Please try again.';
        
        if (error.error?.message) {
          // Use backend's error message
          errorMsg = error.error.message;
        } else if (error.status === 0) {
          errorMsg = 'Cannot connect to server. Please check your connection.';
        } else if (error.status === 403) {
          errorMsg = 'You do not have permission to perform this action.';
        } else if (error.status === 404) {
          errorMsg = 'The requested resource was not found.';
        } else if (error.status >= 500) {
          errorMsg = 'Server error. Please try again later.';
        }
        
        ns.showError(errorMsg, 'Error');
      }
      
      //we rethrow for component to handle it 
      return throwError(() => error);
    })
  );
};
