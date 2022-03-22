import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {UsersPageComponent} from "./components/users-page/users-page.component";
import {MyAccountPageComponent} from "./components/my-account-page/my-account-page.component";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'users', component: UsersPageComponent},
  {path: 'my-account', component: MyAccountPageComponent},
  {path: '**', component: LandingPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
