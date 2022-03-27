import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import {catchError, map, Observable, tap, throwError} from 'rxjs';
import {NotificationService} from "../../_services/notifications/notification.service";

export const maxRetries = 2;
export const delayMs = 2000;

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(
    private notifyService: NotificationService,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("Passed through the interceptor in request");

    return next.handle(request)
      .pipe(
        tap((event: HttpEvent<any>) => {
          // if (event instanceof HttpResponse && event.status === 204) {
          //   this.notifyService.showSuccess("Users deleted successfully.", "TopUpMama")
          // }
        }),
        map(res => {
          console.log("Passed through the interceptor in response", res);
          return res
        }),
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('This is client side error');

            errorMsg = `Error: ${error.error.message}`;
            this.notifyService.showError(`Mmh.. Something went wrong: ${errorMsg}` , "TopUpMama")

          } else {
            console.log('This is server side error');
            if (error.status === 404) {
              this.notifyService.showError(`Mmh.. Something went wrong: Page not found ` , "TopUpMama")
            }
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            console.log(`Interceptor error: ${errorMsg}`)
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }
}
