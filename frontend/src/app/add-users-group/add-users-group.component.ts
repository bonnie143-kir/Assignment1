import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { response } from 'express';

const url = 'http://localhost:3000';

@Component({
  selector: 'app-add-users-group',
  templateUrl: './add-users-group.component.html',
  styleUrls: ['./add-users-group.component.css']
})
export class AddUsersGroupComponent implements OnInit {

  username = "";
  groupName = "";
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  add(){
    let user = {'username': this.username, 'groupName': this.groupName};
    const headers = new HttpHeaders()
    .set('AUthorization', 'my-auth-token')
    .set('Content-Type','application/json');
    this.http.post(url +'/add/user', JSON.stringify(user), {
      headers: headers
    })
    .subscribe((data:any)=> {
      if (data.value == "Created"){
        alert('User has been added to group')
      }else if (data.value == "Doens't exist"){
        alert('Group does not exist!!')
      }
    });
  }
}
