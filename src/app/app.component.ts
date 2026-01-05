import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalNotificationComponent } from './shared/components/global-notification.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalNotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  protected readonly title = 'service-management-system-frontend';
}
