import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileContainerComponent } from '../containers/user-profile-container.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, UserProfileContainerComponent],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {}
