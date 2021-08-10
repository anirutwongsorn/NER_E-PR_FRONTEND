import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account } from '../models/ner/account';
import { LoginModel } from '../models/ner/login';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  login(login: LoginModel): Observable<Account> {
    return this.httpClient
      .post(
        'Account/Login',
        {
          username: login.username,
          password: login.password,
        },
        this.httpOptions
      )
      .pipe(map((result: any) => result.account));
  }
}
