import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeleteuserdetailService {
  url = 'http://localhost:3000/deleteuserdetail'


  constructor(private http: HttpClient) { }


  deleteUser(userID) {
    return this.http.post(this.url, {userID});
  }
}


