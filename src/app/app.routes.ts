import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/authentication/pages/login-page.component';
import { RegisterPageComponent } from './features/authentication/pages/register-page.component';
import { MainLayoutComponent } from './core/layouts/main-layout.component';
import { AdminDashboardComponent } from './features/admin/pages/admin-dashboard.component';
import { CustomerDashboardComponent } from './features/customer/pages/customer-dashboard.component';
import { TechnicianDashboardComponent } from './features/technician/pages/technician-dashboard.component';
import { ManagerDashboardComponent } from './features/manager/pages/manager-dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [

  
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
      { 
        path: 'apply-technician', 
        loadComponent: () => import('./features/technician/pages/technician-application.component').then(m => m.TechnicianApplicationComponent) 
      },
      { path: '', redirectTo: 'catalog', pathMatch: 'full' },
      { 
        path: 'catalog', 
        loadComponent: () => import('./features/customer/pages/customer-catalog.component').then(m => m.CustomerCatalogComponent) 
      },
      {
        path: '',
        canActivate: [authGuard],
        children: [
          { path: 'home', component: HomeComponent },
          { 
            path: 'profile', 
            loadComponent: () => import('./features/profile/pages/user-profile.component').then(m => m.UserProfileComponent)
          },
          { 
            path: 'change-password', 
            loadComponent: () => import('./features/authentication/pages/change-password.component').then(m => m.ChangePasswordComponent)
          },
    
          { 
            path: 'admin/dashboard', 
            component: AdminDashboardComponent,
            canActivate: [roleGuard],
            data: { roles: ['ADMIN'] }
          },
          {
             path: 'admin/categories',
             loadComponent: () => import('./features/catalog/pages/category-management.component').then(m => m.CategoryManagementComponent),
             canActivate: [roleGuard],
             data: { roles: ['ADMIN'] }
          },
          {
             path: 'admin/services',
             loadComponent: () => import('./features/catalog/pages/service-management.component').then(m => m.ServiceManagementComponent),
             canActivate: [roleGuard],
             data: { roles: ['ADMIN'] }
          },
          { 
            path: 'customer/dashboard', 
            component: CustomerDashboardComponent,
            canActivate: [roleGuard],
            data: { roles: ['CUSTOMER'] }
          },
          { 
            path: 'customer/create-request', 
            loadComponent: () => import('./features/customer/pages/create-service-request.component').then(m => m.CreateServiceRequestComponent),
            canActivate: [roleGuard],
            data: { roles: ['CUSTOMER'] }
          },
          { 
            path: 'customer/requests', 
            loadComponent: () => import('./features/customer/pages/my-service-requests.component').then(m => m.MyServiceRequestsComponent),
            canActivate: [roleGuard],
            data: { roles: ['CUSTOMER'] }
          },
          { 
            path: 'customer/invoices', 
            loadComponent: () => import('./features/billing/pages/invoice-list.component').then(m => m.InvoiceListComponent),
            canActivate: [roleGuard],
            data: { roles: ['CUSTOMER'] }
          },
          { 
            path: 'technician/dashboard', 
            component: TechnicianDashboardComponent,
            canActivate: [roleGuard],
            data: { roles: ['TECHNICIAN'] }
          },
          { 
            path: 'technician/tasks', 
            loadComponent: () => import('./features/technician/pages/technician-tasks.component').then(m => m.TechnicianTasksComponent),
            canActivate: [roleGuard],
            data: { roles: ['TECHNICIAN'] }
          },
          { 
            path: 'admin/users', 
            loadComponent: () => import('./features/admin/pages/user-management.component').then(m => m.UserManagementComponent),
            canActivate: [roleGuard],
            data: { roles: ['ADMIN'] }
          },
          { 
            path: 'admin/create-manager', 
            loadComponent: () => import('./features/admin/pages/create-manager.component').then(m => m.CreateManagerComponent),
            canActivate: [roleGuard],
            data: { roles: ['ADMIN'] }
          },
          { 
            path: 'manager/dashboard', 
            component: ManagerDashboardComponent,
            canActivate: [roleGuard],
            data: { roles: ['MANAGER'] }
          },
          { 
            path: 'manager/requests', 
            loadComponent: () => import('./features/manager/pages/manager-requests.component').then(m => m.ManagerRequestsComponent),
            canActivate: [roleGuard],
            data: { roles: ['MANAGER'] }
          },
          { 
            path: 'manager/requests/:id/assign', 
            loadComponent: () => import('./features/manager/pages/manager-assign-technician.component').then(m => m.ManagerAssignTechnicianComponent),
            canActivate: [roleGuard],
            data: { roles: ['MANAGER'] }
          },
          { 
            path: 'manager/approvals', 
            loadComponent: () => import('./features/manager/pages/technician-approvals.component').then(m => m.TechnicianApprovalsComponent),
            canActivate: [roleGuard],
            data: { roles: ['MANAGER'] }
          },
          { 
            path: 'admin/revenue', 
            loadComponent: () => import('./features/billing/pages/revenue-report.component').then(m => m.RevenueReportComponent),
            canActivate: [roleGuard],
            data: { roles: ['ADMIN'] }
          }
        ]
      }
    ]
  },

  { path: '**', redirectTo: 'catalog' }
];
