import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateuserdetailService {
  url = 'http://localhost:3000/updateuserdetail'

  constructor(private http: HttpClient) { }


  updateuser(userID, updateParams) {
    return this.http.post(this.url, {...updateParams, userID});
  }


}
