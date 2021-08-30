import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
url = "http://localhost:3000/signin"

 
  constructor(private http: HttpClient) { }

  login(user,pass){
    return this.http.post(this.url,{user,pass});
  }
 
};


  
 
