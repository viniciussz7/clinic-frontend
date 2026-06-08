import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from '../../../../core/auth/services/user-session.service';
import { AuthStorageService } from '../../../auth/services/auth-storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly authStorage = inject(AuthStorageService);
  private readonly router = inject(Router);
  private readonly session = inject(UserSessionService);

  constructor() {
    console.log(this.session.getClaims());
    console.log(this.session.getUserId());
    console.log(this.session.getEmail());
    console.log(this.session.getRole());

    console.log(this.session.isAdmin());
    console.log(this.session.isDoctor());
    console.log(this.session.isPatient());
  }

  logout(): void {
    this.authStorage.logout();
    this.router.navigate(['/login']);
  }
}
