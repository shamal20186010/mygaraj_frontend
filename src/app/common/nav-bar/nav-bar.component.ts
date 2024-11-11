import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  loggedIn: boolean = false;
  loggedInAdmin: boolean = false;

  user: any;
  userdata: any;

  searchQuery: string = '';

  constructor(private authService: AuthService, private cartService: CartService, private searchService: SearchService) { }

  ngOnInit() {
    this.user = this.authService.getUserProfile();

    this.authService.currentLoginStatus.subscribe(status => {
      this.loggedIn = status;
    });

    this.authService.currentLoginStatusAdmin.subscribe(statusAdmin => {
      this.loggedInAdmin = statusAdmin;
    });

    this.authService.user$.subscribe(userData => {
      this.userdata = userData;
    });
  }


  logout() {
    this.authService.logout();
    this.cartService.clearCart();

  }

  logoutAdmin() {
    this.authService.logoutAdmin();
  }


  onSearch() {
    this.searchService.updateSearchQuery(this.searchQuery);
  }


}
