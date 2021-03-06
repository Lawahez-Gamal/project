import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserService} from './services/user.service'
@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler){
    const token = localStorage.getItem('token')
    if(token){
      request = request.clone({
        headers: request.headers.set('Authorization', token)
      })
    }
    return next.handle(request);
  }
}
