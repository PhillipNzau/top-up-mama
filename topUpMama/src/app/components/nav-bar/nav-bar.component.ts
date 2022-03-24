import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../_services/auth/auth.service";
import {BROWSER_STORAGE} from "../../_helpers/storage";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  uid:any
  // @ts-ignore
  isLoggedIn$: Observable<boolean>;
  //
  constructor(private authService: AuthService, @Inject(BROWSER_STORAGE) public storage: Storage) { }

  ngOnInit(): void {
    this.getSavedUserLatLocation()
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }


  // get location from local storage
  getSavedUserLatLocation(): any {
    this.uid = this.storage.getItem('uid')
  }

  onLogout(){
    this.authService.logout();                      // {3}
  }

}
