import { Injectable } from '@angular/core';
import type { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { AuthService } from 'src/app/service/auth-service/auth-service.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${currentUser.token}`
                }
            });
        }
        return next.handle(request);
    }
}