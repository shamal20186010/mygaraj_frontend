import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Boolean to track if the user is logged in
  private loggedIn = new BehaviorSubject<boolean>(false);
  private loggedInAdmin = new BehaviorSubject<boolean>(false);

  // Observable for other components to subscribe to login state changes
  currentLoginStatus = this.loggedIn.asObservable();
  currentLoginStatusAdmin = this.loggedInAdmin.asObservable();

  constructor(private router: Router) { }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  // Set the user as logged in
  login(): void {
    this.loggedIn.next(true);
  }

  // Set the user as logged out
  logout(): void {
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }

  // admin

  isLoggedInAdmin(): boolean {
    return this.loggedInAdmin.value;
  }

  loginAdmin(): void {
    this.loggedInAdmin.next(true);
  }

  logoutAdmin(): void {
    this.loggedInAdmin.next(false);
    this.router.navigate(['']);
  }



  private user = {
    username: 'johndoe',
    email: 'johndoe@example.com',
    phone: '+123456789'
  };

  getUserProfile() {
    return this.user;
  }


}
