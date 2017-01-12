import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from '../services/user.service';
import { Auth } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Users } from '../common/users.interface';
import { MdSnackBar } from '@angular/material';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';
import { MdDialog } from '@angular/material';
import { CustomEmailFilterPipe } from '../pipes/custom-email-filter.pipe';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  editForm: FormGroup;
  users: Observable<Users[]>;
  userList: any = [];
  selectedOption: string;
  search: string = '';
  editing: boolean = false;
  userIndex: any;
  admin;
  editType: any;
  buttonEnabled: any = false;
  constructor(
    private userSrv: UserService,
    private _zone: NgZone,
    public snackBar: MdSnackBar,
    private formB: FormBuilder,
    public dialog: MdDialog
  ) {
    this.editForm = this.formB.group({
      'email': [null, Validators.compose([Validators.pattern('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$'), Validators.nullValidator])],
      'password': [null, Validators.compose([Validators.minLength(6), Validators.nullValidator])],
    });
  }

  ngOnInit() {
    this.userSrv.getUsers();
    this.users = this.userSrv.users;
    console.log('users', this.users);
    this.userSrv.users.subscribe(data => {
      this._zone.run(() => this.userList = data);
      console.log(this.userList);
    });
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'CLOSE', {
      duration: 2000,
    });
  }

  deleteUser(id) {
    this.userSrv.deleteUser(id)
      .then(res => {
        this.openSnackBar('User deleted.');
      })
      .catch(err => {
        this.openSnackBar('Error deleting user.');
      });
  }

  showEdit(index, type) {
    this.editing = true;
    this.userIndex = index;
    this.editType = type;
    if (this.userList[index].admin === '1') {
      this.admin = true;
    } else {
      this.admin = false;
    }
    if (type === 1 || type === 0) {
      this.buttonEnabled = true;
    }
  }

  changeAdmin(id) {
    console.log('change admin', id);
  }

  editUser(id, data, type) {
    let user;
    let admin;
    console.log('type',type)
    if (this.admin === false) {
      admin = '0';
    } else {
      admin = '1';
    }
    if (type === 0) {
      user = {
        admin: admin
      };
    } else if (type === 1) {
      user = {
        email: data.email
      };
    } else if (type === 2) {
      user = {
        password: data.password
      };
    }

    console.log('user', user);
    this.userSrv.editUser(id, user)
      .then(res => {
        this.openSnackBar('User edited.');
        this.editing = false;
        this.editType = '';
      })
      .catch(err => {
        console.log(err.json());
        this.openSnackBar(err.json().reason);
      })
  }

  goBack() {
    this.editing = false;
    this.editType = '';
  }

  openDialog() {
    let dialogRef = this.dialog.open(CreateUserDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'CREATED') {
        this.openSnackBar('User created');
      } else if (result === 'ERROR') {
        this.openSnackBar('Error creating user');
      }
    });
  }

}
