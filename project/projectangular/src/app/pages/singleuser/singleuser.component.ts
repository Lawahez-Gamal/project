import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-singleuser',
  templateUrl: './singleuser.component.html',
  styleUrls: ['./singleuser.component.css']
})
export class SingleuserComponent implements OnInit {
  userData :any
  constructor(private _user:UserService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this._user.showSingleUser(this.route.snapshot.paramMap.get('id')).subscribe(single=>{
      this.userData = single.data})
  }

}
