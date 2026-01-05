import { HttpInterceptorFn } from '@angular/common/http';

//we have to register it in the app.config file
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    //we cant use set as http request is readonly, so angular provides us clone method
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    //next means just pass the request forward to the next interceptor
    return next(cloned);
  }
  //if no token request goes unchanged
  return next(req);
};
