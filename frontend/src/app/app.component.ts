import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  nothing = true;
  role = "";
  value = "";

  constructor() {
    this.role = localStorage.getItem('role')!;
    this.value = localStorage.getItem('show')!;
  }


}
