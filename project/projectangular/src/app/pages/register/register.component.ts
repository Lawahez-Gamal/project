import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginflag: boolean= true;

  constructor(private _user:UserService, private router:Router) { }

  userModel= new FormGroup({
  userName:new FormControl("",[Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
  name:new FormControl("",[Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
  email:new FormControl("",[Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.email]),
  password:new FormControl("",[Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
  re_password:new FormControl("",[Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
  phone:new FormControl("",[Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
  role:new FormControl("",[Validators.required])

})
  ngOnInit(): void {
  }

  onSubmitRegister(){
  // this.userModel.value.type = 0
  this._user.signUp(this.userModel.value).subscribe(data=>{
    console.log(data)
  }
  ,()=>{}
  ,()=>{
 
    this._user.signIn(this.userModel.value).subscribe(data=>{
      this.loginflag=false
      console.log(data);
      localStorage.setItem('token',`${data.token_type} ${data.access_token}`)
    },()=>{
      //problem
      console.log('ay 7aga byza')
    }
      ,()=>{
        //done
        console.log('ay 7aga')
        this.router.navigateByUrl("/")
      })      
    })
  }


}
