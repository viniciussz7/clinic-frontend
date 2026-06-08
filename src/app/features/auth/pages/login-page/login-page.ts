import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthFacade } from '../../facades/auth.facade';
import { AuthStorageService } from '../../services/auth-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtService } from '../../../../core/auth/services/jwt.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly authFacade = inject(AuthFacade);
  private readonly authStorage = inject(AuthStorageService);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly jwtService = inject(JwtService);

  protected readonly loginForm = this.fb.group({
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
  });

  protected onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const request = this.loginForm.getRawValue();

    this.authFacade.login(request).subscribe({
      next: (response) => {
        this.authStorage.saveToken(response.token);
        const claims = this.jwtService.decodeToken(response.token);

        console.log('JWT Claims:', claims);
        this.router.navigate(['/dashboard']);

        //this.http.get('http://localhost:8080/admin/dashboard').subscribe({
        //next: (data) => {
        //console.log('Dashboard Admin');
        //console.log(data);
        //},

        //error: (err) => {
        //console.error('Erro ao acessar dashboard');
        //console.error(err);
        //},
        //});
      },

      error: (error) => {
        console.error('Erro ao realizar login');
        console.error(error);
      },
    });
  }
}
