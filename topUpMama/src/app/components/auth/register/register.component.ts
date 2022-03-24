import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../_services/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  isShowPassword = false;
  submitted = false;

  // Create the login form
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,100}$')]]
  });

  constructor(private fb: FormBuilder, private loginService: AuthService
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
    this.loginService.register(this.registerForm.value).subscribe({
      next: (registerRes:any) =>{
        // console.log('Register res success: ', registerRes)
      },
      error: (err:any) =>{
        console.log('Register res: ',err)


      }
    })

  }
}
