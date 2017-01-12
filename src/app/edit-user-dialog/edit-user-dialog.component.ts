import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  public editUser: FormGroup;
  admin;
  editing: boolean = false;
  constructor(
    private formB: FormBuilder
  ) {
    this.editUser = formB.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$'), Validators.nullValidator])],
      'password': [null, Validators.compose([ Validators.minLength(6)])],
    });
   }

  ngOnInit() {
  }

}
