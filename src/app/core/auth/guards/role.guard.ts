import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserSessionService } from '../services/user-session.service';
import { UserRole } from '../../../features/auth/models/user-role.enum';

export const roleGuard: CanActivateFn = (route) => {

    const session = inject(UserSessionService);
    const router = inject(Router);

    const allowedRoles = route.data?.['roles'] as UserRole[];

    const currentRole = session.getRole();

    if (currentRole && allowedRoles.includes(currentRole)) {
        return true;
    }

    return router.createUrlTree(['/dashboard']);
};