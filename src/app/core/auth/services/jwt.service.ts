import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

import { JwtClaims } from '../../../features/auth/models/jwt-claims.model';
@Injectable({
  providedIn: 'root',
})
export class JwtService {

    decodeToken(token: string): JwtClaims {
        return jwtDecode<JwtClaims>(token);
    }
}
