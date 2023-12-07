import { Component, ViewChild } from '@angular/core';
import { AuthResponse, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoading = false;
  isLoginMode = true;
  error: string | null = null;
  @ViewChild('authForm') authForm!: NgForm; // Alternative access form

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode = () => {
    this.isLoginMode = !this.isLoginMode;
  };

  onSubmit = (authForm: NgForm) => {
    this.isLoading = true;

    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObservable: Observable<AuthResponse>;

    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signup(email, password);
    }

    authObservable.subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        // You can navigate from either here are or the AuthService
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    authForm.reset();
  };
}
