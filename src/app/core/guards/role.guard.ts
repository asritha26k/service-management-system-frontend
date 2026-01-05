import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../services/auth-state.service';
import { NotificationService } from '../services/notification.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authState = inject(AuthStateService);
  const router = inject(Router);
  const ns = inject(NotificationService);
  const requiredRoles = route.data['roles'] as Array<string>;

  if (!authState.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const userRole = authState.userRole();
  if (userRole && requiredRoles.includes(userRole)) {
    return true;
  }

  // Not authorized
  ns.showError('You do not have permission to access this page', 'Access Denied');
  router.navigate(['/']);
  return false;
};
