import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserNotificationService, AppNotification } from '../../../core/services/user-notification.service';
import { CommonModule } from '@angular/common';
import { AuthStateService } from '../../../core/services/auth-state.service';
import { AuthService } from '../../../features/authentication/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  authState = inject(AuthStateService);
  authService = inject(AuthService);
  notificationService = inject(UserNotificationService);
  router = inject(Router);

  notifications: AppNotification[] = [];

  ngOnInit() {
    if (this.authState.isAuthenticated()) {
       this.loadNotifications();
    }
  }

  loadNotifications() {
    this.notificationService.getUserNotifications().subscribe({
      next: (res) => this.notifications = res,
      error: (err) => console.error('Failed to load notifications', err)
    });
  }

  markAsRead(notif: AppNotification) {
    if (!notif.read) {
      this.notificationService.markAsRead(notif.id).subscribe({
        next: () => {
          notif.read = true;
        },
        error: (err) => console.error('Failed to mark as read', err)
      });
    }
  }

  get unreadCount() {
    return this.notifications.filter(n => !n.read).length;
  }

  getHomeLink(): string {
    const role = this.authState.userRole();
    if (!this.authState.isAuthenticated() || !role) {
      return '/';
    }
    return `/${role.toLowerCase()}/dashboard`;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

