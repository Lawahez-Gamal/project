import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { BooksService } from 'src/app/services/books.service';
@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {
bookData:any
public ImageURL = "./././assets/"
bookURL="./././assets/bookData.bookimg"

  constructor(private _book:BooksService, private route:ActivatedRoute,private _http:HttpClient) {
   }

  ngOnInit(): void {
    this._book.showSingleBook(this.route.snapshot.paramMap.get('id')).subscribe(single=>{
    this.bookData = single.data})

  }
  downlondBook(){
    this._book.showSingleBook(this.bookURL).subscribe(data=>{
      console.log(data)})
  }

}
