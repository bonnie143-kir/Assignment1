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

  click(){
    let user = {'email': this.email, 'password':this.password};
    console.log(user);
    //const headers = new HttpHeaders().set('Authorization', 'my-auth-token').set('Content-Type','application/json');
    this.http.post(url+'/auth', user, {
     // headers: headers
    })
    .subscribe((data:any)=>{
      console.log(data);
      if(data.value == "Fail"){
        alert("User does not exist");
        this.router.navigateByUrl('login');
      }else if(data.role == "super"){
        this.router.navigateByUrl('super-admin');
      }else if(data.role == "groupAd"){
        this.router.navigateByUrl('group-admin');  
      }else if(data.role == "groupAs"){
        this.router.navigateByUrl('group-assist');
      }else if(data.role == "user"){
        this.router.navigateByUrl('normalUser');
      }
    });
  }

  // click() {
  //   let user = {'email': this.email};
  //   const headers = new HttpHeaders()
  //   .set('AUthorization', 'my-auth-token')
  //   .set('Content-Type','application/json');
  //   this.http.post(url +'/auth', JSON.stringify(user), {
  //     headers: headers
  //   })
  //   .subscribe((data:any)=> {
  //     if (data.role == 'super'){
  //       localStorage.setItem('email', data.email);
  //       localStorage.setItem('password', data.password);
  //       localStorage.setItem('role', data.role);
  //       localStorage.setItem('id', data.id);
  //       localStorage.setItem('username', data.username);
  //       localStorage.setItem('show', 'false');
  //       this.router.navigateByUrl('/super-admin');
  //     }else if (data.role == 'groupAd') {
  //       localStorage.setItem('email', data.email);
  //       localStorage.setItem('password', data.password);
  //       localStorage.setItem('role', data.role);
  //       localStorage.setItem('id', data.id);
  //       localStorage.setItem('username', data.username);
  //       localStorage.setItem('show', 'false');
  //       this.router.navigateByUrl('/group-admin');
  //     }else if (data.role == 'groupAs') {
  //       localStorage.setItem('email', data.email);
  //       localStorage.setItem('password', data.password);
  //       localStorage.setItem('role', data.role);
  //       localStorage.setItem('id', data.id);
  //       localStorage.setItem('username', data.username);
  //       localStorage.setItem('show', 'false');
  //       this.router.navigateByUrl('/group-assist');
  //     }else if (data.role == 'normalUser') {
  //       localStorage.setItem('email', data.email);
  //       localStorage.setItem('password', data.password);
  //       localStorage.setItem('role', data.role);
  //       localStorage.setItem('id', data.id);
  //       localStorage.setItem('username', data.username);
  //       localStorage.setItem('show', 'false');
  //       this.router.navigateByUrl('/normalUser');
  //     } else if (data.length == 0) {
  //       alert('Invalid details'); 
  //     }
  //   });
  //  }

}
