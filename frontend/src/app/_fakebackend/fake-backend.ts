import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError, pipe } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

//array de users registrados do storage
const users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const { url, method, headers, body } = req;

        //simulando chamada na api
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                default:
                    return next.handle(req);
            }
        }

        //funcção authenticate
        function authenticate(){
            const { username, password} = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username ou password incorreto.');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-token-jwt'
            });
        }

        //function register()
        function register(){
            const user = body;

            if (users.find(x=>x.username === user.username)) {
                return error("Username "+ user.username + " is já existe.")
            }

            user.id = users.length ? Math.max(...users.map(x=>x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        //function ok e error
        function ok(body?){
            return of(new HttpResponse({ status: 200, body}));
        };

        function error(message){
            return throwError({ error: { message } });
        };

    };
};

export const fakeBackendProvider = {
    //usando o fakebackend
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};