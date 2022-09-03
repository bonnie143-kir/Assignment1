import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

const url = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email = ""
password = ""

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  click() {
    let user = {'email': this.email, 'password': this.password};
    this.http.post(url +'/auth', JSON.stringify(user))
    .subscribe((data:any)=> {
      if (data.valid == true){
        this.router.navigateByUrl('/user');
      }else {
        alert('Invalid details');
      }
    })
  }

}
