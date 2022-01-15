import { Injectable } from '@angular/core';
import type { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import type { User } from 'src/app/model/User';
import type { AuthService } from 'src/app/service/auth-service/auth-service.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    currentUser: User;
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) { 
        this.currentUser = this.authenticationService.currentUserValue
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log(this.currentUser,"currentUser");
        if (this.currentUser) {
            // if (route.data.roles === currentUser.role?.name)
            if (route.data.roles && route.data.roles.indexOf(this.currentUser.role?.name) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['/' + state.url], { queryParams: { returnUrl: state.url } });
                console.log("adminfalse");

                return false;
            }
            return true;
        } else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
            console.log("admintrue");
            
            return false;
        }
    }
}