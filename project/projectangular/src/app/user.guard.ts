import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private router:Router, private _user:UserService){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot):boolean | UrlTree {
//       if(!this._user.islogged){
//         this.router.navigate(['Login'],{queryParams:{returnedForm: this.router.url}})
//      return true
//   }
// }
}
