import { UserRole } from './user-role.enum';

export interface JwtClaims {
    sub: string;
    email: string;
    role: UserRole;
    iat: number;
    exp: number;
}