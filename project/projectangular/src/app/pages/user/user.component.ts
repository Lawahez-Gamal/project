import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  allData: any;
  constructor(private _user:UserService) { }

  ngOnInit(): void {
    this._user.showAllUsers().subscribe(data=>
      {
      this.allData = data.data
      console.log(this.allData)
    }
    )
  }

}
