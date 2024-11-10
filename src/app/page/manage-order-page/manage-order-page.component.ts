import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-order-page',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './manage-order-page.component.html',
  styleUrl: './manage-order-page.component.css'
})
export class ManageOrderPageComponent {
  public orderList: any = [];
  selectedOrder: any = "";

  constructor(private http: HttpClient) {
    this.loadTable();
  }

  loadTable() {
    this.http.get("http://localhost:8080/orders/get-all-orders").subscribe(data => {
      console.log(data);
      this.orderList=data;
    })
  }



  viewOrderItems(order: any){
    this.selectedOrder = order;
  }

  deleteOderById(id: any){

  }

}
