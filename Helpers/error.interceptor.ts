import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  constructor(private router: Router, private storage: StorageService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let errorMessage;
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof HttpErrorResponse) {
          // client-side error
          errorMessage = `[CLIENT SIDE]Error: ${error.error.message};`;
        } else {
          // server-side error
          if (error.status === 401) {
            this.storage.signOut();
          }
          if (error.status === 0) {
            errorMessage =
              '[SERVER SIDE] Problem communicating with the server.';
          } else
            errorMessage = `[SERVER SIDE] Error Code: ${error.status}\nMessage: ${error.message};`;
          /* this.router.navigate(['auth', 'login']); */
        }

        if (environment.production) {
          return throwError(new Error(`${error.status}]: ${error.message}`));
        } else {
          return throwError(error);
        }
      })
    );
  }
}
export const errorInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorCatchingInterceptor,
    multi: true,
  },
];
