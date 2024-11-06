import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./common/nav-bar/nav-bar.component";
import { AddProductPageComponent } from './page/add-product-page/add-product-page.component';
import { ManageProductPageComponent } from './page/manage-product-page/manage-product-page.component';
import { FooterComponent } from "./common/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, AddProductPageComponent, ManageProductPageComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Mygaraj-Forntend';
}
