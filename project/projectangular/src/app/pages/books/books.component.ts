import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
 
public ImgURL ="./././assets/"
  allData: any;
    //  filtered = this.allData
    //  val = ""
    
    //  filterbooks(val:any){
    //    let key = val.target.value
   
    //    this.allData.filter((el:any)=>{
   
    //      return el.title.includes(key)
   
    //    })
    //  }
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
