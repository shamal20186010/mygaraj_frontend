import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  public isLoginUser: any = {
    username: "",
    password: ""
  }

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  public user: any = {}


  async isLogin() {
    const data = await this.http.get(`http://localhost:8080/register/login/${this.user.username}`).toPromise();
    this.isLoginUser = data;
    this.validateUser();
  }

  validateUser() {
    if (this.isLoginUser.password === this.user.password && this.isLoginUser.username != "admin@gmail.com") {
      alert("success login...")
      this.authService.login(this.isLoginUser);
      this.router.navigate(['']);

    } else if (this.isLoginUser.username === "admin@gmail.com" || this.isLoginUser.password === "1234") {
      this.authService.loginAdmin(this.isLoginUser);
      this.router.navigate(['']);
    }
    else {
      alert("incorrect username or password...")
    }
  }

}
