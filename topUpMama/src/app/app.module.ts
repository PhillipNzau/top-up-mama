import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { MyAccountPageComponent } from './components/my-account-page/my-account-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ErrorCatchingInterceptor} from "./_helpers/interceptors/error-catching.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LandingPageComponent,
    UsersPageComponent,
    MyAccountPageComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
