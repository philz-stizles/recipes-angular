import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // https://firebase.google.com/docs/reference/rest/auth
  user = new BehaviorSubject<User | null>(null);
  tokenExpirationTimeout?: any;
  baseUrl = environment.baseUrl;

  constructor(private https: HttpClient, private router: Router) {}

  signup = (email: string, password: string) => {
    return this.https
      .post<AuthResponse>(`${this.baseUrl.replace('{ENDPOINT}', 'signUp')}`, {
        // return the Observable since we are interested in monitoring the response in the AuthComponent
        // to display loading, error if any etc.
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError), tap(this.handleAuthentication));
  };

  login = (email: string, password: string) => {
    return this.https
      .post<AuthResponse>(
        `${this.baseUrl.replace('{ENDPOINT}', 'signInWithPassword')}`,
        {
          // return the Observable since we are interested in getting the response
          // in the
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError), tap(this.handleAuthentication));
  };

  autoLogin = () => {
    const stringifiedUserData = localStorage.getItem('userData');
    if (!stringifiedUserData) {
      return;
    }

    const userData = JSON.parse(stringifiedUserData) as {
      id: string;
      email: string;
      _token: string;
      _tokenExpirationDate: string;
    };

    const tokenExpirationDateString = userData._tokenExpirationDate;
    const loadedUser = new User(
      userData.id,
      userData.email,
      userData._token,
      new Date(tokenExpirationDateString)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const millisecondsToExpiration =
        new Date(tokenExpirationDateString).getTime() - new Date().getTime();
      this.autoLogout(millisecondsToExpiration);
    }
  };

  autoLogout = (expiresInMs: number) => {
    this.tokenExpirationTimeout = setTimeout(() => {
      this.logout();
    }, expiresInMs);
  };

  logout = () => {
    console.log('logout')
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimeout) {
      clearTimeout(this.tokenExpirationTimeout);
    }
  };

  private handleAuthentication = (data: AuthResponse) => {
    // expiresIn from firebase is in seconds
    const expiresInMilliSeconds = +data.expiresIn * 1000;
    const tokenExpirationDate = new Date(
      new Date().getTime() + expiresInMilliSeconds
    );
    const currentUser = new User(
      data.localId,
      data.email,
      data.idToken,
      tokenExpirationDate
    );

    this.user.next(currentUser);
    this.autoLogout(expiresInMilliSeconds);
    localStorage.setItem('userData', JSON.stringify(currentUser));
  };

  private handleError = (error: HttpErrorResponse) => {
    console.log(error.error.error);
    let message = 'Something went wrong';
    if (!error || !error.error || !error.error.error) {
      return throwError(() => new Error(message));
    }

    switch (error.error.error.message) {
      case 'EMAIL_EXISTS':
        message = 'This email is already taken';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        message = 'Invalid Login Credentials';
        break;
      case 'USER_DISABLED':
        message = 'Invalid email or password';
        break;
      default:
        break;
    }

    return throwError(() => new Error(message));
  };
}
