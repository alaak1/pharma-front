import { Component } from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();

    // Optional: listen for login/logout events if needed later
  }

  logout() {
    this.authService.logout();   // clears everything + navigates to login
    this.isLoggedIn = false;     // update UI state
  }
}
