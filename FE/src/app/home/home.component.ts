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
  records: any = AdduserdetailService;
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
  modalState = 'add';
  editID = null

  constructor(private route: Router, private modalService: NgbModal, private adduser: AdduserdetailService, private deleteuser: DeleteuserdetailService, private updateuser: UpdateuserdetailService, private getuser: GetuserdetailService) { }
  ngOnInit() {
    this.getuser.getUser().subscribe(res => {
      this.records = res;
    })
  }

  openModal(modalContent) {
    this.modalState = 'add';
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

  addRecord() {
    this.adduser.addUser(this.newRecord).subscribe((data: status) => {
      if (data.status == "success") {
        alert("Added Successful");
      }
      this.clearNewRecord();
      this.modalService.dismissAll();
    })
  }

  editRecord(modalContent, userID) {
    this.modalState = 'edit';
    this.editID = userID;
    const [selectedrecord] = this.records.filter(r => r.id === userID);
    this.newRecord = selectedrecord;
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

  deleteitem(userID) {
    this.deleteuser.deleteUser(userID);
  }
}