import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../../models/register.model';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  // public user: any = {
  //   name: "",
  //   address: "",
  //   username: "",
  //   password: ""
  // }

  // isLogedinUser: any = {}
  // alreadyExistsUser: boolean = true;

  // constructor(private router: Router, private http: HttpClient) { }

  // async register() {
  //   const data = await this.http.get(`http://localhost:8080/register/login/${this.user.username}`).toPromise();
  //   this.isLogedinUser = data;

  //   if (this.isLogedinUser.username == this.user.username) {
  //     this.alreadyExistsUser = false;
  //   } else {
  //     this.alreadyExistsUser = true;
  //   }

  //   console.log("logedUser" + this.isLogedinUser);
  //   console.log("Username" + this.isLogedinUser.username);

  //   if (this.alreadyExistsUser) {

  //     this.http.post("http://localhost:8080/register/addUser", this.user).subscribe(res => {
  //       alert("register success!!!!");
  //       this.router.navigate(['/login']);
  //     })
  //   } else {
  //     alert("already exists username, please change your username !...");
  //   }
  // }

  // public registerUser() {

  // }



  user: Register = { id: null, name: '', address: '', username: '', password: '' };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private registerService: RegisterService, private router: Router) { }

  register() {
    this.registerService.registerUser(this.user).subscribe(
      (response) => {

        if (response.body && response.body.text) {
          this.successMessage = response.body.text;
          alert("User successfully registered")
          this.router.navigate(['/login']);
        }
        this.errorMessage = '';
      },
      (error) => {
        console.error(error);
        this.successMessage = '';
        this.errorMessage = error;
      }
    );
  }
}

