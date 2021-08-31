import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { GetuserdetailService } from '../getuserdetail.service';
import { AdduserdetailService } from '../adduserdetail.service';
import { DeleteuserdetailService } from '../deleteuserdetail.service';
import { UpdateuserdetailService } from '../updateuserdetail.service';
import { Router } from '@angular/router';
import { mergeNsAndName } from '@angular/compiler';
import { getLocaleDayNames } from '@angular/common';
interface status {
  status: string
  // _id: any;
  //     name: string;
  //     contact: any;
  //     address: any;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  records: any = [];
  newRecord = {
    first_name: '',
    middle_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    address: '',
    contact: '',
  };
  editID = null

  constructor(private route: Router, private modalService: NgbModal, private adduser: AdduserdetailService, private deleteuser: DeleteuserdetailService, private updateuser: UpdateuserdetailService, private getuser: GetuserdetailService) { }
  ngOnInit() {
    this.getUsers()
  }

  openModal(modalContent) {
    this.modalService.open(modalContent, {
      ariaLabelledBy: 'modal-basic-title'
    });
  }

  clearNewRecord() {
    this.newRecord = {
      first_name: '',
      middle_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      address: '',
      contact: '',
    };
  }

  getUsers() {
    this.getuser.getUser().subscribe((res:any) => {
      console.log(res)
      this.records = res.data;
    })
  }

  addRecord() {
    this.adduser.addUser(this.newRecord).subscribe((data: status) => {
      this.clearNewRecord();
      this.modalService.dismissAll();
      this.getUsers()
    })
  }

  editRecord(modalContent, userID) {
    console.log({userID})
    this.editID = userID;
    const [selectedrecord] = this.records.filter(r => r._id === userID);
    console.log({selectedrecord})
    this.newRecord.address = selectedrecord.Address;
    this.newRecord.first_name = selectedrecord.Fname;
    this.newRecord.last_name = selectedrecord.Lanme;
    this.newRecord.middle_name = selectedrecord.Mname;
    this.newRecord.username = selectedrecord.user;
    this.newRecord.email = selectedrecord.Email;
    this.newRecord.password = selectedrecord.pas;
    this.openModal(modalContent);
  }

  updateRecord() {
    this.updateuser.updateuser(this.editID, this.newRecord).subscribe((data: status) => {
      if (data.status == "success") {
        alert("Added Successful");
      }
      this.clearNewRecord();
      this.modalService.dismissAll();
    })
  }

  deleteRecord(userID) {
    this.deleteuser.deleteUser(userID).subscribe(res =>
      this.getUsers());
  }
  refresh() {
    return true;
  }
}