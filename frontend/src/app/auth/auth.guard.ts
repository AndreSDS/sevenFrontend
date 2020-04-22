import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../auth/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            //autorizado retorna true
            return true;
        }

        //se não está logado redireciona para o login
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}