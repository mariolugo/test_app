import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '../core/http-client';
import { Config } from '../core/config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Users } from '../common/users.interface';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class UserService {
    public users: Observable<Users[]>;
    private _users = new BehaviorSubject<Users[]>([]);
    private _usersObserver: Observer<Users[]>;
    private dataStore: {
        users: Users[]
    };
    constructor(
        private router: Router,
        private http: HttpClient,
        private config: Config
    ) {
        this.dataStore = { users: [] }
        this._users = <BehaviorSubject<Users[]>>new BehaviorSubject([]);
        this.users = this._users.asObservable();
    }
    //this works with asynchronous arrays

    //create user
    createUser(data) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.config.baseUrl}user/newUser`, data)
                .map(response => response.json())
                .subscribe(data => {
                    this.dataStore.users = data.users;
                    this._users.next(Object.assign({}, this.dataStore).users);
                    resolve(data);
                }, error => reject(error));
        })
    }
    
    //edit user
    editUser(id,data) {
        console.log('user data',data);
        return new Promise((resolve, reject) => {
            this.http.put(`${this.config.baseUrl}user/editUser/${id}`, data)
                .map(response => response.json())
                .subscribe(data => {
                    console.log('data', data);
                    this.dataStore.users = data.users;
                    this._users.next(Object.assign({}, this.dataStore).users);
                    resolve(data);
                }, error => reject(error));
        })
    }

    //get users
    getUsers() {
        this.http.get(`${this.config.baseUrl}user`)
            .map(response => response.json())
            .subscribe(data => {
                console.log('data', data);
                this.dataStore.users = data;
                this._users.next(Object.assign({}, this.dataStore).users);
            }, error => console.log('Could not load users.'));
    }

    //delete user
    deleteUser(id) {
        return new Promise((resolve, reject) => {
            this.http.delete(`${this.config.baseUrl}user/deleteUser/${id}`)
                .map(response => response.json())
                .subscribe(data => {
                    console.log('data', data);
                    this.dataStore.users = data.users;
                    this._users.next(Object.assign({}, this.dataStore).users);
                    resolve(data);
                }, error => reject(error));
        })

    }
}
