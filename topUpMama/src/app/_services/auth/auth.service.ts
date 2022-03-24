import {Inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, tap} from "rxjs";
import {BROWSER_STORAGE} from "../../_helpers/storage";
import {NotificationService} from "../notifications/notification.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Login register Url
  loginUserUrl = environment.loginUser
  registerUserUrl = environment.registerUser

  constructor(
    private http: HttpClient,
    private notifyService: NotificationService,
    @Inject(BROWSER_STORAGE) public storage: Storage) { }

  getHeaders(): any {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('tum_access_token')}`,
        Accept: '*/*',
      }),
    };
  }

  saveToken(token: string): any {
    return this.storage.setItem('access_token', token);
  }

  getToken(): any {
    return this.storage.getItem('access_token');
  }

  saveRefreshToken(token: string): any {
    return this.storage.setItem('tum_refresh_token', token);
  }

  getRefreshToken(): any {
    return this.storage.getItem('tum_refresh_token');
  }

  saveUserId(id: string):any {
    return this.storage.setItem('uid', id)
  }

  removeSetStorage(): any {
    return this.storage.clear();
  }



  // Login user
  login(userData:any): Observable<any> {
    // return this.http.post(this.loginUserUrl, userData)
    return this.http.post(this.loginUserUrl, userData).pipe(
      tap(),
      map((res:any)=> {
        this.notifyService.showSuccess("Users logged in successfully.", "TopUpMama")
        const resLength = Object.keys(res).length

        if(resLength > 0) {
          this.saveToken(res.token)
        }
      }),
    catchError(async (error) => {
      this.notifyService.showError("Mmh.. Something went wrong logging in.", "TopUpMama")
      console.log('errors');
      // this.loginServerError = error.error.error;
    })
    );
  }

  register(userData:any): Observable<any> {
    return this.http.post(this.registerUserUrl, userData, this.getHeaders()).pipe(
      tap(),
      map((res:any)=> {
        this.notifyService.showSuccess("Users registered successfully.", "TopUpMama")

        const resLength = Object.keys(res).length

        if(resLength > 0) {
          this.saveToken(res.token)
          this.saveUserId(res.id)
        }
      }),
      catchError(async (error) => {
        this.notifyService.showError("Mmh.. Something went wrong registering.", "TopUpMama")

        console.log('errors', error);
        // this.loginServerError = error.error.error;
      })
    );
  }
}
