import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, throwError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';

@Injectable()
export class NotAuthenticatedInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          if (event.status === 401) {
            this.authService.logout();
            /* this.router.navigate(['/auth/login']); */ // Use this line instead of changing window.location.href
            window.location.href = window.location.origin + `/auth/login`;
            if (!environment.production) {
              console.log(`Unauthorized access of ${req.url}`);
            }
          }
          if (!environment.production) {
            console.log(
              req.url,
              'returned a response with status',
              event.status,
            );
          }
        }
      }),
      catchError((event) => {
        if (event.status === 401) {
          this.authService.logout(['/auth/login']);
          if (!environment.production) {
            console.log(`Unauthorized access of ${req.url}`);
          }
        }
        return throwError(() => event);
      }),
    );
  }
}
export const notAuthenticatedInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: NotAuthenticatedInterceptor,
    multi: true,
  },
];
