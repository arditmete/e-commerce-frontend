import { Injectable } from '@angular/core';
import type { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import type { Observable} from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import type { AuthService } from 'src/app/service/auth-service/auth-service.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload();
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}