import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateuserdetailService {
  url(userID) {
    return `http://localhost:3000/updateuserdetail/${userID}`
  }


  constructor(private http: HttpClient) { }


  updateuser(userID, updateParams) {
    return this.http.post(this.url(userID), updateParams);
  }


}
