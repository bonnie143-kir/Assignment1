import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  myFunction(){
    document.getElementById("myDropdown")?.classList.toggle("show");
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  profile() {
    
  }

}
