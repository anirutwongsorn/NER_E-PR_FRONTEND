import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../models/ner/login';
import { AuthenticationService } from '../Services/authentication.service';
import { TokenStorageService } from '../Services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenStorage: TokenStorageService
  ) {}

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  fullName = '';

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.fullName = this.tokenStorage.getUser();
      //alert(this.fullName);
    }
  }

  onSubmit(loginForm: NgForm): void {
    //alert('Login submit');
    if (loginForm.invalid) {
      return;
    }
    const val = loginForm.value;
    var _login = new LoginModel();
    _login.username = val.username;
    _login.password = val.password;

    this.authService.login(_login).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.fullName);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.fullName = this.tokenStorage.getUser();
        this.reloadPage();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    //this.router.navigate(['/nerubber']);
    window.location.reload();
  }
}
