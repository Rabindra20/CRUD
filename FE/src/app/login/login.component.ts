import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
interface status {
  status : string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private user: UserService, private route: Router) { 
    if(localStorage.getItem('isLogin')==="true")
    route.navigateByUrl('/home');
  }

  ngOnInit() {
  }
  login(user,pass){
    var uname = user.value;
    var passwd = pass.value;
    this.user.login(uname,passwd).subscribe((data:any) => {
      if(data.status == "success"){
        localStorage.setItem('isLogin','true');
        this.route.navigateByUrl('/home');
      }
      else
      alert("invalid user/pass");
    });
  }
register(){
  this.route.navigateByUrl('/signup')
}


}

