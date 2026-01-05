import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-global-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './global-notification.component.html',
  styleUrl: './global-notification.component.css'
})
export class GlobalNotificationComponent {
  ns = inject(NotificationService);

  getIconClass() {
    switch (this.ns.type()) {
      case 'success': return 'bi-check-circle-fill';
      case 'danger': return 'bi-x-circle-fill';
      case 'warning': return 'bi-exclamation-triangle-fill';
      case 'info': return 'bi-info-circle-fill';
      default: return 'bi-info-circle-fill';
    }
  }

  getIconColor() {
    switch (this.ns.type()) {
      case 'success': return '#198754';
      case 'danger': return '#dc3545';
      case 'warning': return '#ffc107';
      case 'info': return '#0dcaf0';
      default: return '#0dcaf0';
    }
  }

  getBorderClass() {
    return 'border-start border-4 border-' + this.ns.type();
  }

  getButtonClass() {
    return 'btn-' + this.ns.type();
  }
}
