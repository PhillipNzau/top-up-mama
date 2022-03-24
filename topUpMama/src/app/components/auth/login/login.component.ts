import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../_services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isShowPassword = false;
  submitted = false;
  // Create the login form
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,100}$')]]
  });

  constructor(
    private fb: FormBuilder,
    private loginService: AuthService
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
    this.loginService.login(this.loginForm.value).subscribe({
      next: (loginRes:any) =>{
        // console.log('Login res success: ',loginRes)
      },
      error: (err:any) =>{
        console.log('Login res: ',err)


      }
    })

  }

  // check form validity
  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

}
