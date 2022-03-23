import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../_services/auth/auth.service";
import {TokenStorageService} from "../../_services/auth/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isShowPassword = false;
  submitted = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  // Create the login form
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,100}$')]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {
  }

  ngOnInit(): void {
  }

  changeIsShowPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  loginUserSubmit() {
    this.submitted = true;
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: data => {
        console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.error;
        this.isLoginFailed = true;
      }
    });
  }
  reloadPage(): void {
    window.location.href='';
  }

  // check form validity
  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

}
