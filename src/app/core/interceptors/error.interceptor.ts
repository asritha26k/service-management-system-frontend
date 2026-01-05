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
      
      // Don't show modal for logout errors (401 when already logging out)
      if (!req.url.includes('/logout')) {
        const errorMsg = error.error?.message || error.message || 'Unknown error';
        ns.showError(errorMsg, 'Server Error');
      }
      //we rethrow for component to handle it 
      return throwError(() => error);
    })
  );
};
