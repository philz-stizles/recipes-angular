import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Outgoing request: ', req.url);
    return next.handle(req).pipe(
      // Use the pipe to interact with the interceptor response
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          console.log('Incoming response: ', event.body);
        }
      })
    );
  }
}
