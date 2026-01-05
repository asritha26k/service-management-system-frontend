import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnicianApprovalsListComponent } from '../containers/technician-approvals-list/technician-approvals-list.component';

@Component({
  selector: 'app-technician-approvals',
  standalone: true,
  imports: [CommonModule, TechnicianApprovalsListComponent],
  templateUrl: './technician-approvals.component.html'
})
export class TechnicianApprovalsComponent {}
