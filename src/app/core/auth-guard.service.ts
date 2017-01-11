import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Auth } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  canActivate() {
    if (!this.auth.isLoggedIn()) {
      console.log('not auth');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}