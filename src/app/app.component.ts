import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Event as RouterEvent } from '@angular/router';
import {Auth} from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(
    private authSrv: Auth,
    private router: Router
  ){
    //if user is logged in, get data from localstorage and save it to the user model
    if (this.authSrv.isLoggedIn()){
      let sessionData = {
        token: window.localStorage.getItem('id_token'),
        user: JSON.parse(window.localStorage.getItem('user'))
      };
      this.authSrv.setUserData(sessionData);
    }
    
  }
}
