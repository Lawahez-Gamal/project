import { HttpClient } from '@angular/common/http';
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
    role: 0
  }

 myImg!: File;
imgName:any
retrievedImage: any;
base64Data: any;
retrieveResonse: any;
imageName: any

  loginflag = true
  constructor(private _user:UserService, private _http:HttpClient) { }

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

onUpload() {
  console.log(this.myImg);
  
  const uploadImageData = new FormData();
  uploadImageData.append('image', this.myImg, this.myImg.name);

  //Make a call to the Spring Boot Application to save the image
  this._http.post('http://localhost:3000/image/upload', uploadImageData, { observe: 'response' })
    .subscribe((response) => {
     console.log(response);
     
    }
    );
  }

  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this._http.get('http://localhost:3000/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
}
