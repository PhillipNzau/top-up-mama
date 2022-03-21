import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isShowPassword = false;

  constructor() {}

  ngOnInit(): void {}

  changeIsShowPassword() {
    this.isShowPassword = !this.isShowPassword;
  }
}
