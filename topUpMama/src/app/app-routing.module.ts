import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {UsersPageComponent} from "./components/users-page/users-page.component";
import {MyAccountPageComponent} from "./components/my-account-page/my-account-page.component";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {AuthGuard} from "./_services/auth/auth.guard";

const routes: Routes = [
  {path: '', component: LandingPageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'users', component: UsersPageComponent, canActivate: [AuthGuard]},
  {path: 'my-account', component: MyAccountPageComponent, canActivate: [AuthGuard]},
  {path: '**', component: LandingPageComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
