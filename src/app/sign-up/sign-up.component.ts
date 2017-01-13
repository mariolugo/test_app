import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Auth} from '../services/auth.service';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public signUp: FormGroup;
  admin;
  constructor(
    private router: Router,
    private formB: FormBuilder,
    private authService: Auth,
    public snackBar: MdSnackBar
  ) {
    //user form validation
    this.signUp = formB.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$'), Validators.nullValidator])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.nullValidator])],
    });
   }

  ngOnInit() {
  }

  //open toast message
  openSnackBar(message) {
    this.snackBar.open(message,'CLOSE', {
      duration: 2000,
    })
  }

  //create user
  createUser(data,valid){
    console.log('admin',this.admin);
    if (this.admin){
      data.admin = '1'
    } else {
      data.admin = '0'
    }
    console.log(data);
    this.authService.signUp(data)
    .then(res=>{
      console.log('res',res);
      this.router.navigate(['/home']);
    })
    .catch(err=>{
      this.openSnackBar(err.message);
    })
  }

}
