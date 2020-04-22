import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../auth/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    constructor(private authenticationService: AuthenticationService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //adiciona um autorização toke jwt se existir
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(req);
    }
}