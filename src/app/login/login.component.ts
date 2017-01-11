import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Auth} from '../services/auth.service';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(
    private router: Router,
    private authService: Auth,
    private formB: FormBuilder,
    public snackBar: MdSnackBar
  ) { 
    this.loginForm = formB.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$'), Validators.nullValidator])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.nullValidator])],
    });
  }

  ngOnInit() {
  }

  openSnackBar(message) {
    this.snackBar.open(message,'CLOSE', {
      duration: 2000,
    })
  }

  login(value,valid){
    this.authService.login(value)
    .then(res=>{
      this.router.navigate(['']);
    })
    .catch(err=>{
      this.openSnackBar('Bad credentials or user don´t exist');
    });
    
  }

}
