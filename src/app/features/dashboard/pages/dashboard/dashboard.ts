import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStorageService } from '../../../auth/services/auth-storage';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  private readonly authStorage = inject(AuthStorageService);
  private readonly router = inject(Router);

  logout(): void {
    this.authStorage.logout();
    this.router.navigate(['/login']);
  }
}
