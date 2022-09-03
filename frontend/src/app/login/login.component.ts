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
    const headers = new HttpHeaders()
    .set('AUthorization', 'my-auth-token')
    .set('Content-Type','application/json');
    this.http.post(url +'/auth', JSON.stringify(user), {
      headers: headers
    })
    .subscribe((data:any)=> {
      if (data.role == 'super'){
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('password', data.password);
        this.router.navigateByUrl('/super-admin');
      }else if (data.role == 'groupAd') {
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('password', data.password);
        this.router.navigateByUrl('/group-admin');
      }else if (data.role == 'groupAs') {
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('password', data.password);
        this.router.navigateByUrl('/group-assist');
      }else if (data.role == 'user') {
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('password', data.password);
        this.router.navigateByUrl('/user');
      } else {
        alert('Invalid details'); 
      }
    });
  }

}
