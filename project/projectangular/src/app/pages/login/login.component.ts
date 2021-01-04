import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userModal = {
    email:"",
    password:"",
    image:"",
    type: 0
  }

 myImg:File | undefined

  loginflag = true
  constructor(private _user:UserService) { }

  ngOnInit(): void {
  }
  
  onLoginSubmit(){
  console.log(this.userModal)  
  this._user.signIn(this.userModal).subscribe(data=>{
    this.loginflag=false
    console.log(data);
    localStorage.setItem('token',`${data.token_type} ${data.access_token}`)
  })
}


imageUpload(e:any){
  this.myImg = e.target.files[0]
}
}
