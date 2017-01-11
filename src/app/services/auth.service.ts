import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '../core/http-client';
import { Config } from '../core/config';

@Injectable()
export class Auth {
  private loggedIn = false;
  constructor(
    private router: Router,
    private http: HttpClient,
    private config:Config
  ) {
  }

  login(credentials) {
    return new Promise((resolve,reject)=>{
      this.http.post(`${this.config.baseUrl}auth/signin`,credentials)
      .map(x => x.json())
      .subscribe(res=>{
        if(res.token){
          window.localStorage.setItem('id_token',res.token);
          //window.localStorage.setItem('session',JSON.stringify(res.json().user));
          //this.setUserData(res.json().user);
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
        if(res.code === 'CREATED'){
          window.localStorage.setItem('id_token',res.data.token);
        }
        resolve(res);
      }, err =>{
        reject(err.json());
      })
    })
  }

  updateUser(data,id){
    return new Promise((resolve,reject)=>{
      this.http.put(`${this.config.baseUrl}user/${id}`,data)
      .subscribe(res=>{
        console.log('s',res.json());
        window.localStorage.setItem('session',JSON.stringify(res.json()));
        resolve(res.json());
      }, err =>{
        reject(err);
      })
    })
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
