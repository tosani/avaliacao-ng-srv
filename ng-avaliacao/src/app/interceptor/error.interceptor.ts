import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WsResult } from '../model/ws-result';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError(response => {
          if (response instanceof HttpErrorResponse) {
            if (response.error.message) {
              const wsResult = Object.assign(new WsResult(), response.error);
              const nResponse = new HttpResponse({ body: wsResult, headers: response.headers, status: response.status, url: response.url });
              return of(nResponse);
            }
          }
          return throwError(`${response.status}: Ocorreu um erro inesperado. Por favor tente novamente mais tarde.`);
        })
      );

  }
}
