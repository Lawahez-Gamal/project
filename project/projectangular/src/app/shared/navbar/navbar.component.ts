import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  allData:any="localhost:3000/allBooks";
    //  filtered = this.allData
     val = ""
    
     filterbooks(val:any){
       let key = val.target.value
   
       this.allData.filter((el:any)=>{
   
         return el.title.includes(key)
   
       })
     }
  constructor() { }

  ngOnInit(): void {
  }

}
