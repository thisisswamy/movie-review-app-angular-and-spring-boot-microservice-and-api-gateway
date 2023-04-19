import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiDetails } from 'src/environment/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ApiReqHelperInterceptor implements HttpInterceptor {

  constructor(private cookiService:CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!request.url.includes("/auth/login") && !request.url.includes("/auth/login")){
      request =request.clone({
        setHeaders:{
          // "Authorization":apiDetails.JWT_TOKEN,
          "Authorization":this.cookiService.get("token"),
          // "content-type":"application/json",
          // "RIID":Math.round(Math.random() * 20000000000 + 1).toString()
        }
      });
      
    }
    return next.handle(this.authTokenHeaders(request));
  }
  private authTokenHeaders(request:HttpRequest<any>){
    return request.clone({
      headers:request.headers
    })
  }
}
