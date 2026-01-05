import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateServiceRequestContainerComponent } from '../containers/create-service-request-container.component';

@Component({
  selector: 'app-create-service-request',
  standalone: true,
  imports: [CommonModule, CreateServiceRequestContainerComponent],
  templateUrl: './create-service-request.component.html'
})
export class CreateServiceRequestComponent {}
