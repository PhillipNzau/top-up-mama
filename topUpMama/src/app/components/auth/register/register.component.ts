import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../_services/auth/auth.service";
import {LoadingHandler} from "../../../_helpers/loading-handler";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  // loading
  loadingHandler = new LoadingHandler();

  isShowPassword = false;
  submitted = false;

  // Create the login form
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,100}$')]]
  });

  constructor(
    private fb: FormBuilder,
    private loginService: AuthService) {}

  ngOnInit(): void {
  }

  // Show/hide pwd
  changeIsShowPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  // Register function
  registerUserSubmit() {
    this.loadingHandler.start();

    this.loginService.register(this.registerForm.value).subscribe({
      next: (registerRes:any) =>{
        this.loadingHandler.finish();
        },
      error: (err:any) =>{
        console.log('Register res: ',err)
      }
    })
  }

  // check form validity
  get email() {
    return this.registerForm.get('email')
  }

  get password() {
    return this.registerForm.get('password')
  }
}
