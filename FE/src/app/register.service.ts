
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
url = "http://localhost:3000/register"

 
  constructor(private http: HttpClient) { }

  
  register(user,Fname,Contact,pass){
    return this.http.post(this.url,{user,Fname,Contact,pass});
  }
};
