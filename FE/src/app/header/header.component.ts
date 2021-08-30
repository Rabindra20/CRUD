import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
    private authGuardService: AuthGuardService) { }

  ngOnInit() {
  }
  logout() {
    this.authGuardService.logout();
    this.router.navigate(['/login']);
  }
}
