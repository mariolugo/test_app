import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { Auth } from './services/auth.service';
import {AuthGuard} from './core/auth-guard.service';
import { Config } from './core/config';
import { HttpClient } from './core/http-client';
import { routing,routedComponents } from './app.routes';
import {UserData} from './core/user-data';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthCardComponent } from './auth-card/auth-card.component';
import { EqualValidatorDirective } from './equal-validator.directive';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    SignUpComponent,
    AuthCardComponent,
    EqualValidatorDirective,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    MaterialModule.forRoot()
  ],
  providers: [
    Auth,
    AuthGuard,
    HttpClient,
    Config,
    UserData
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }