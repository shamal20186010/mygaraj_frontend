import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  public user: any = {
    name: "",
    address: "",
    username: "",
    password: ""
  }

  constructor(private router: Router, private http: HttpClient) { }


  public register() {
    this.http.post("http://localhost:8080/register/addUser", this.user).subscribe(res => {
      alert("register success!!!!");
      this.router.navigate(['/login']);
    })
  }
}
