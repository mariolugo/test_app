import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { Auth } from './services/auth.service';
import { AuthGuard } from './core/auth-guard.service';
import { AuthAdminGuard } from './core/auth-admin-guard.service';
import { Config } from './core/config';
import { HttpClient } from './core/http-client';
import { routing,routedComponents } from './app.routes';
import { UserData } from './core/user-data';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthCardComponent } from './auth-card/auth-card.component';
import { EqualValidatorDirective } from './equal-validator.directive';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RealTimeComponent } from './real-time/real-time.component';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { CustomEmailFilterPipe } from './pipes/custom-email-filter.pipe';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { ProductPanelComponent } from './product-panel/product-panel.component';
import { CreateProductDialogComponent } from './create-product-dialog/create-product-dialog.component';
import { ProductCardsComponent } from './product-cards/product-cards.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { RealTimeUserComponent } from './real-time-user/real-time-user.component';
import { RealTimeAdminComponent } from './real-time-admin/real-time-admin.component';

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
    AdminDashboardComponent,
    UserListComponent,
    ProductListComponent,
    RealTimeComponent,
    CreateUserDialogComponent,
    CustomEmailFilterPipe,
    EditUserDialogComponent,
    ProductPanelComponent,
    CreateProductDialogComponent,
    ProductCardsComponent,
    OrderByPipe,
    RealTimeUserComponent,
    RealTimeAdminComponent
  ],
  entryComponents: [
    CreateUserDialogComponent,
    EditUserDialogComponent,
    CreateProductDialogComponent
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
    UserData,
    UserService,
    ProductService,
    AuthAdminGuard
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }