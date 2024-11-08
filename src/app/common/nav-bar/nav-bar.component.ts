import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  loggedIn: boolean = false;
  loggedInAdmin: boolean = false;

  user: any;
  userdata: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUserProfile();
    // Subscribe to login status changes
    this.authService.currentLoginStatus.subscribe(status => {
      this.loggedIn = status; // Update the navbar based on login state
    });

    this.authService.currentLoginStatusAdmin.subscribe(statusAdmin => {
      this.loggedInAdmin = statusAdmin;
    });

    this.authService.user$.subscribe(userData => {
      this.userdata = userData;
    });
  }

  // Call logout when user clicks logout button
  logout() {
    this.authService.logout(); // Log the user out
  }

  logoutAdmin() {
    this.authService.logoutAdmin();
  }


 
}
