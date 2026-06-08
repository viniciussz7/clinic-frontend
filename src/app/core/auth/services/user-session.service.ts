import { inject, Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { AuthStorageService } from '../../../features/auth/services/auth-storage.service';
import { JwtClaims } from '../../../features/auth/models/jwt-claims.model';
import { UserRole } from '../../../features/auth/models/user-role.enum';

@Injectable({
  providedIn: 'root',
})
export class UserSessionService {
  private readonly authStorage = inject(AuthStorageService);
  private readonly jwtService = inject(JwtService);

  getClaims(): JwtClaims | null {
    const token = this.authStorage.getToken();

    if (!token) {
      return null;
    }

    return this.jwtService.decodeToken(token);
  }

  getUserId(): string | null {
    return this.getClaims()?.sub ?? null;
  }

  getEmail(): string | null {
    return this.getClaims()?.email ?? null;
  }

  getRole(): UserRole | null {
    return this.getClaims()?.role ?? null;
  }

  isAdmin(): boolean {
    return this.getRole() === UserRole.ADMIN;
  }

  isDoctor(): boolean {
    return this.getRole() === UserRole.DOCTOR;
  }

  isPatient(): boolean {
    return this.getRole() === UserRole.PATIENT;
  }
}
