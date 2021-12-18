import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/services/auth.service';

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

  constructor(private router: Router,
    private service: AuthService) { }
  get usuario() {
    return this.service.usuario

  }

  logout() {
    this.router.navigateByUrl("/auth/login");
    this.service.logout();

  }


}
