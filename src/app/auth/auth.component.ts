import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AuthResponse, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { PlaceholderDirective } from '../shared/directives/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoading = false;
  isLoginMode = true;
  error: string | null = null;
  @ViewChild('authForm') authForm!: NgForm; // Alternative access form
  @ViewChild(PlaceholderDirective, { static: false })
  placeholder!: PlaceholderDirective;
  private closedSubscription!: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router // private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnDestroy(): void {
    if(this.closedSubscription) {
      this.closedSubscription.unsubscribe();
    }
  }

  onSwitchMode = () => {
    this.isLoginMode = !this.isLoginMode;
  };

  onClose = () => {
    this.error = null;
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
        this.isLoading = false;
        // You can navigate from either here are or the AuthService
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
        this.showErrorAlert(errorMessage);
      }
    );

    authForm.reset();
  };

  showErrorAlert = (message: string) => {
    // const componentFactory =
    //   this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const viewContainerRef = this.placeholder.viewContainerRef;
    viewContainerRef.clear();
    // viewContainerRef.createComponent(componentFactory);
    const alertCompRef = viewContainerRef.createComponent(AlertComponent);
    alertCompRef.instance.message = message;
    this.closedSubscription = alertCompRef.instance.closed.subscribe(() => {
      this.closedSubscription.unsubscribe();
      viewContainerRef.clear();
    });
  };
}
