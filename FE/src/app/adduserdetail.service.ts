import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdduserdetailService {
  url = "http://localhost:3000/adduserdetail"

 
  constructor(private http: HttpClient) { }

  
  addUser(addParams) {
    return this.http.post(this.url, addParams);
  }
}
