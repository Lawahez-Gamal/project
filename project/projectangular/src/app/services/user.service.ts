import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

defaultURL ="http://localhost:3000/"
public imgURL = "http://localhost:3000/"
lang: string ='en'
  islogged: any;

  constructor(private _http:HttpClient) {
   
    this.lang = localStorage.getItem('currentLanguage') || "1"
   }

   signUp(obj:any):Observable<any>{
    return this._http.post(`${this.defaultURL}Registeruser`,obj)
   }

   signIn(obj:any):Observable<any>{
    return this._http.post(`${this.defaultURL}/loginuser`,obj)
   }

   authMe():Observable<any>{
    return this._http.post(`${this.defaultURL}/users/me`,null)
   }

   logOut():Observable<any>{
    return this._http.get(`${this.defaultURL}/logoutuser`)
   }
}
