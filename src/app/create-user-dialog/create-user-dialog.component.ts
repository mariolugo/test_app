import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.css']
})
export class CreateUserDialogComponent implements OnInit {
  public newUser: FormGroup;
  admin;
  constructor(
    public dialogRef: MdDialogRef<CreateUserDialogComponent>,
    private formB: FormBuilder,
    private userSrv: UserService
  ) { 
    //user form for validation
    this.newUser = formB.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$'), Validators.nullValidator])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.nullValidator])],
    });
  }

  ngOnInit() {
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
    this.userSrv.createUser(data)
    .then(res=>{
      this.dialogRef.close('CREATED')
    })
    .catch(err=>{
      this.dialogRef.close('ERROR')
    })
  }

}
