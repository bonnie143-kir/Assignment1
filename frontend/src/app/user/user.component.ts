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
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  email="";
  username="";
  isLoggedIn = true;
  
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  createUser(){
    let user = {'email': this.email, 'username': this.username};
    console.log(user);
    const headers = new HttpHeaders()
    .set('AUthorization', 'my-auth-token')
    .set('Content-Type','application/json');
    this.http.post(url + '/createUser', JSON.stringify(user), {headers:headers})
    .subscribe((data:any)=> {
      if (data == "Exists"){
        alert('This user already exists!')
      }else if (data == "Added") {
        alert('The user has been added')
      }
    });
  }

}
