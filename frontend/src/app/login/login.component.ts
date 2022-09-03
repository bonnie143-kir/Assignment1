import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { response } from 'express';

const url = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email = ""
password = ""

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
  }

  click() {
    let user = {'email': this.email, 'password': this.password};
    this.http.post(url +'/auth', JSON.stringify(user))
    .subscribe((data:any)=> {
      if (data.valid == true){
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('password', data.password);
        this.router.navigateByUrl('/user');
      }else {
        alert('Invalid details');
      }
    });
  }

}
