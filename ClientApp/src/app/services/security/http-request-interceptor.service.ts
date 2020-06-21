import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {TokenService} from './token.service';
import {Token} from './security.models';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: Token = this.tokenService.getToken();

    request = token ? request.clone(
      {
        headers: request.headers.set('Authorization', 'Bearer ' + token.value)
      }
    ) : request;

    return next.handle(request).pipe(
      catchError(
        (error: HttpErrorResponse, caught: Observable<HttpEvent<HttpErrorResponse>>) => {

          if (error.status === 401) {
            this.router.navigate(['/login']);
            return of<HttpEvent<HttpErrorResponse>>();
          }

          if (error.status === 403) {
            this.router.navigate(['/forbidden']);
            return of<HttpEvent<HttpErrorResponse>>();
          }
          return throwError(error);
        }
      )
    );
  }
}
