import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnicianApplicationFormContainerComponent } from '../containers/technician-application-form-container.component';

@Component({
  selector: 'app-technician-application',
  standalone: true,
  imports: [CommonModule, TechnicianApplicationFormContainerComponent],
  templateUrl: './technician-application.component.html'
})
export class TechnicianApplicationComponent {}
