import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent {

  public productList: any = [];

  constructor(private http: HttpClient) {
    this.loadTable();
  }

  loadTable() {
    this.http.get("http://localhost:8080/product/getAll-product").subscribe(data => {
      console.log(data);
      this.productList = data;

    })
  }
  public productTemp: any = {}
  viewProduct(product: any) {
    console.log(product);
    this.productTemp = product;
  }


}
