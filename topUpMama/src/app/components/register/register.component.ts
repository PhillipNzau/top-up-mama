import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../_services/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  isShowPassword = false;
  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  // Create the login form
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,100}$')]]
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  changeIsShowPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  // check form validity
  get email() {
    return this.registerForm.get('email')
  }

  get password() {
    return this.registerForm.get('password')
  }

  registerUserSubmit() {
    this.submitted = true;
    const {email, password} = this.registerForm.value;
    this.authService.register(email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        console.log(err.error.error)
        this.errorMessage = err.error.error;
        this.isSignUpFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.href='/login';
  }
}
