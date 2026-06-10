import { Routes } from '@angular/router';
import { LoginPage } from './features/auth/pages/login-page/login-page';
import { Dashboard } from './features/dashboard/pages/dashboard/dashboard';
import { authGuard } from './core/guards/auth.guard';
import { DesignSystemComponent } from './features/design-system/design-system';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  {
    path: 'design-system',
    component: DesignSystemComponent,
  },
];
