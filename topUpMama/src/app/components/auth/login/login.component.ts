import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isShowPassword = false;

  constructor() {}

  ngOnInit(): void {}

  changeIsShowPassword() {
    this.isShowPassword = !this.isShowPassword;
  }
}
