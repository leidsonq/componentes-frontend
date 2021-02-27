import { HttpEvent, HttpInterceptor, HttpRequest, HttpHeaders, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "../services/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor (public storage: StorageService){
        
    }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            console.log("Passou pelo AuthIterceptor");

            let localUser = this.storage.getLocalUser();

            let N = API_CONFIG.baseUrl.length;
            let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;

            if (localUser && requestToAPI){
                const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer '+localUser.token)});
                return next.handle(authReq);
            }
            else{
                return next.handle(req);
            }
        }
}

export const AuthIterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};