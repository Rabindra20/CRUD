import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetuserdetailService {

  url = "http://localhost:3000/getuserdetail"


  constructor(private http: HttpClient) { }


  getUser() {
    return this.http.get(this.url);
  }
}
