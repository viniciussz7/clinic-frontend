import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthFacade } from '../../facades/auth.facade';
import { AuthStorageService } from '../../services/auth-storage';

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
        console.log('Login realizado com sucesso');
        this.authStorage.saveToken(response.token);
        console.log('Token salvo');
      },

      error: (error) => {
        console.error('Erro ao realizar login');
        console.error(error);
      },
    });
  }
}
