import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeleteuserdetailService {
  url(userID) {
    return `http://localhost:3000/deleteuserdetail/${userID}`
  }


  constructor(private http: HttpClient) { }


  deleteUser(userID) {
    return this.http.delete(this.url(userID));
  }
}


