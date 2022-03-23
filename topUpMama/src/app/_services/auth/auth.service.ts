import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // Login register Url
  loginUserUrl = environment.loginUser
  registerUserUrl = environment.registerUser


  constructor(private http: HttpClient) {
  }

  // Login user
  login(email: string, password: string): Observable<any> {
    return this.http.post(this.loginUserUrl, {
      email,
      password
    }, httpOptions);
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(this.registerUserUrl, {
      email,
      password
    }, httpOptions);
  }
}
