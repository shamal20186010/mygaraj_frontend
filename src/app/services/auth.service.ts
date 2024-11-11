import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Boolean to track if the user is logged in
  private loggedIn = new BehaviorSubject<boolean>(false);
  private loggedInAdmin = new BehaviorSubject<boolean>(false);

  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user$: Observable<any> = this.userSubject.asObservable();

  // Observable for other components to subscribe to login state changes
  currentLoginStatus = this.loggedIn.asObservable();
  currentLoginStatusAdmin = this.loggedInAdmin.asObservable();

  constructor(private router: Router) { }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  private user: any = {}

  // Set the user as logged in
  login(userData: any): void {
    this.userSubject.next(userData);
    this.loggedIn.next(true);
  }

  // Set the user as logged out
  logout(): void {
    this.loggedIn.next(false);
    this.router.navigate(['']);
    this.userSubject.next(null);
  }

  // admin

  isLoggedInAdmin(): boolean {
    return this.loggedInAdmin.value;
  }

  loginAdmin(userData: any): void {
    this.loggedInAdmin.next(true);
    this.userSubject.next(userData);
  }

  logoutAdmin(): void {
    this.loggedInAdmin.next(false);
    this.router.navigate(['']);
    this.userSubject.next(null);
  }

  getUser() {
    return this.userSubject.getValue();
  }

  getUserProfile() {
    return this.user;
  }


}
