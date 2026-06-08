import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStorageService } from '../../features/auth/services/auth-storage';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authStorage = inject(AuthStorageService);
    const token = authStorage.getToken();

    if (!token) {
        return next(req);
    }

    const authenticatedReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });

    return next(authenticatedReq);
}
