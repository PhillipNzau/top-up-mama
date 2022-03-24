import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // Users url
  userUrl = environment.userList;
  userCreateUrl = environment.userCreate;
  userUpdateUrl = environment.userUpdateDelete

  constructor(public http: HttpClient) { }

  getHeaders(): any {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        Accept: '*/*',
      }),
    };
  }

  ///////////////////////////-- List Users---////////////////
  listUsers(page: number, size:number):Observable<any> {
    let params = new HttpParams();
    params = params.append('page', String(page))
    params = params.append('per_page', String(size));

    return this.http.get(this.userUrl + '?' + params, this.getHeaders())
  }

  ///////////////////////////-- create Users---////////////////
  createUser(userData:any): any{
    return this.http.post(this.userUrl, userData, this.getHeaders())
  }

  ///////////////////////////-- delete Users---////////////////
  deleteUser(id:number):any {
    return this.http.delete(this.userUpdateUrl + id, this.getHeaders())
  }

  viewUser(id:number):any {
    return this.http.get(this.userUpdateUrl + id, this.getHeaders())
  }

  updateUser(userdata:any, id:number):any {
    return this.http.patch(this.userUpdateUrl + id, userdata, this.getHeaders())
  }






}
