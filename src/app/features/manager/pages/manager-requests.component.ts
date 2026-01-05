import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRequestsListComponent } from '../containers/manager-requests-list/manager-requests-list.component';

@Component({
  selector: 'app-manager-requests',
  standalone: true,
  imports: [CommonModule, ManagerRequestsListComponent],
  templateUrl: './manager-requests.component.html'
})
export class ManagerRequestsComponent {}
