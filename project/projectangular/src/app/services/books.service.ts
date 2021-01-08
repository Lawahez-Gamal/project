import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
public ImageURL = "http://localhost:3000"
MAINURL= "http://localhost:3000/"

  constructor(private _http:HttpClient) { }

  showAllBooks():Observable<any>{
   return this._http.get(`${this.MAINURL}allBooks`)
  }

  showSingleBook(id:any):Observable<any>{
     return this._http.get(`${this.MAINURL}singleBook/${id}`)
  }
}
