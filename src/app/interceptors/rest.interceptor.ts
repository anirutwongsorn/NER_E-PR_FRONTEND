import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { finalize, tap, delay } from 'rxjs/operators';
import { LoadingService } from '../Services/loading.service';
import { TokenStorageService } from '../Services/token-storage.service';

@Injectable()
export class RestInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
    private loadingService: LoadingService,
    private token: TokenStorageService
  ) {}

  TOKEN_HEADER_KEY = 'Authorization';

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //console.log(JSON.stringify(request));

    const token = this.token.getToken();
    const url = environment.baseUrl + 'api/' + request.url;
    const urlReq = request.clone({ url });
    let authReq = urlReq;
    if (token != null) {
      authReq = urlReq.clone({
        headers: urlReq.headers.set(this.TOKEN_HEADER_KEY, 'Bearer ' + token),
      });
      //alert(token);
    }

    if (!request.reportProgress) {
      this.loadingService.inderminate.next(true);
    }

    const config: MatSnackBarConfig = {
      duration: 5000,
      // verticalPosition: 'top',
      // horizontalPosition: 'end',
      panelClass: ['snackbar', 'snackbar-success'],
    };

    const configErr: MatSnackBarConfig = {
      duration: 5000,
      // verticalPosition: 'top',
      // horizontalPosition: 'end',
      panelClass: ['snackbar', 'snackbar-error'],
    };

    // return next.handle(urlReq).pipe(
    return next.handle(authReq).pipe(
      tap(
        (event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total!);
              console.log(progress);
              break;
            case HttpEventType.Response:
              if (event instanceof HttpResponse) {
                switch (event.status) {
                  case 200:
                    if (request.method === 'PUT') {
                      this.snackBar.open(
                        'Save data success',
                        undefined,
                        config
                      );
                    }
                    break;
                  case 201:
                    this.snackBar.open('Save data success', undefined, config);
                    break;
                  case 204:
                    this.snackBar.open('Save data success', undefined, config);
                    break;
                }
              }
              break;
          }
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401 || error.status === 403) {
              this.snackBar.open(
                'login failed, unauthorize',
                undefined,
                configErr
              );
              window.location.reload();
            } else if (error.status === 404 && error.error.message) {
              this.snackBar.open('Error 404 not found', undefined, configErr);
            } else if (error.status === 500) {
              this.snackBar.open(
                'Server error!, please try again',
                undefined,
                configErr
              );
            } else {
              this.snackBar.open(error.message, undefined, configErr);
            }
          }
        }
      ),
      delay(500),
      finalize(() => {
        this.loadingService.inderminate.next(false);
      })
    );
  }
}
