import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserService } from '../services/admin-user.service';
import { UserDTO } from '../models/user-management.models';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent implements OnInit {
  private userService = inject(AdminUserService);

  users: UserDTO[] = [];
  page = 0;
  size = 20;
  totalUsers = 0;
  totalPages = 0;
  isLoading = true;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getUsersByRole('CUSTOMER', this.page, this.size).subscribe({
      next: (res) => {
        this.users = res.content;
        this.totalUsers = res.totalElements;
        this.totalPages = res.totalPages;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load users', err);
        this.isLoading = false;
      }
    });
  }

  changePage(newPage: number) {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.loadUsers();
    }
  }
}
