import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email = ""
password = ""
isLoggedIn = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  click() {
    this.isLoggedIn = true;
  }

}
