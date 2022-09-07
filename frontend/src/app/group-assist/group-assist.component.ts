import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-assist',
  templateUrl: './group-assist.component.html',
  styleUrls: ['./group-assist.component.css']
})
export class GroupAssistComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
