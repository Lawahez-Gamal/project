import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  allData: any;
  constructor(private _book:BooksService) { }

  ngOnInit(): void {

    this._book.showAllBooks().subscribe(data=>
      {
      this.allData = data.data
      console.log(this.allData)
    }
    )

    
  }

}
