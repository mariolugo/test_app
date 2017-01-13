import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '../core/http-client';
import { Config } from '../core/config';
import { UserData } from '../core/user-data';

@Injectable()
export class Auth {
  private loggedIn = false;
  constructor(
    private router: Router,
    private http: HttpClient,
    private config:Config,
    public userData: UserData
  ) {
    this.userData = new UserData();
  }

  login(credentials) {
    return new Promise((resolve,reject)=>{
      this.http.post(`${this.config.baseUrl}auth/signin`,credentials)
      .map(x => x.json())
      .subscribe(res=>{
        if(res.token){
          window.localStorage.setItem('id_token',res.token);
          window.localStorage.setItem('user',JSON.stringify(res.user));
          this.setUserData(res);
        }
        resolve(res);
      }, err =>{
        reject(err);
      })
    })
  }

  signUp(credentials){
    return new Promise((resolve,reject)=>{
      this.http.post(`${this.config.baseUrl}auth/signup`,credentials)
      .map(x => x.json())
      .subscribe(res=>{
        console.log('ress',res);
        window.localStorage.setItem('id_token',res.token);
        window.localStorage.setItem('user',JSON.stringify(res.user));
        this.setUserData(res);
        resolve(res);
      }, err =>{
        reject(err.json());
      })
    })
  }

  getUserData() {
    return this.userData;
  }

  setUserData(data) {
    console.log('user data',data);
    this.userData.id = data.user.id;
    this.userData.token = data.token;
    this.userData.email = data.user.email;
    this.userData.admin = data.user.admin;
  }

  logout() {
    // To log out, just remove the token and profile
    // from local storage
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');

    // Send the user back to the dashboard after logout
    this.router.navigateByUrl('/home');
  }

  isLoggedIn(){
    return window.localStorage.getItem('id_token');
  }
}
