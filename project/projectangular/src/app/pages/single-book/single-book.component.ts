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
// public ImageURL = ""

imgName:any
retrievedImage: any;
base64Data: any;
retrieveResonse: any;
imageName: any

  constructor(private _book:BooksService, private route:ActivatedRoute,private _http:HttpClient) {
    // this.image = '../bookimage/download.jpg'
   }

  ngOnInit(): void {
    this._book.showSingleBook(this.route.snapshot.paramMap.get('id')).subscribe(single=>{
    this.bookData = single.data})

  //  this.getImage('http://localhost:3000/book/uploadImg')
  }
  // getImage(url: string) {
  //  return this._book.getFiles(url)
  //     .subscribe(image => {
  //       this.image = image;
  //     });
  //   }


  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this._http.get('http://localhost:3000/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
}
