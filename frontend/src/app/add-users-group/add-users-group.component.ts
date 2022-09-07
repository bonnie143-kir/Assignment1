import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-users-group',
  templateUrl: './add-users-group.component.html',
  styleUrls: ['./add-users-group.component.css']
})
export class AddUsersGroupComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
