import { inject, Injectable } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../models/login-request.model';

@Injectable({
    providedIn: 'root',
})
export class AuthFacade {
    private readonly authService = inject(AuthService);

    login(request: LoginRequest) {
        return this.authService.login(request);
    }
}