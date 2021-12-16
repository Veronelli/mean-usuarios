import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
    article{
      margin:10px
    }
  `]
})
export class DashboardComponent {

  constructor(private router: Router) { }

  logout() {
    this.router.navigateByUrl("/auth/login");

  }


}
