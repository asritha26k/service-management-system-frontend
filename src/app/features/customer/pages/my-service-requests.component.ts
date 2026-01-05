import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyServiceRequestsContainerComponent } from '../containers/my-service-requests-container.component';

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [CommonModule, MyServiceRequestsContainerComponent],
  templateUrl: './my-service-requests.component.html'
})
export class MyServiceRequestsComponent {}
