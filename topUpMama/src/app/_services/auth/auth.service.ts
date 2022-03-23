import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Login register Url
  loginUserUrl = environment.loginUser
  registerUserUrl = environment.registerUser

  constructor(private http: HttpClient) { }

  // Login user
  login(email: string, password: string): Observable<any> {
    return this.http.post(this.loginUserUrl, {
      email,
      password
    });
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(this.registerUserUrl, {
      email,
      password
    });
  }
}
