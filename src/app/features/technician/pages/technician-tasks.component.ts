import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnicianTasksContainerComponent } from '../containers/technician-tasks-container.component';

@Component({
  selector: 'app-technician-tasks',
  standalone: true,
  imports: [CommonModule, TechnicianTasksContainerComponent],
  templateUrl: './technician-tasks.component.html'
})
export class TechnicianTasksComponent {}

