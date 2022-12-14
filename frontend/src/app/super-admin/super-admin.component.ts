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
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {

  id = 0;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }
  
  ngOnInit(): void {
  }

  myFunction(){
    document.getElementById("myDropdown")?.classList.toggle("show");
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  delete() {
    let userid = {'id': this.id}
    const headers = new HttpHeaders()
    .set('AUthorization', 'my-auth-token')
    .set('Content-Type','application/json');
    this.http.post(url + '/deleteUser', JSON.stringify(userid), {headers:headers})
    .subscribe((data:any)=> {
      console.log(data);
    });
  }

}
