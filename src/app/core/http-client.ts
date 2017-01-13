import {Injectable} from '@angular/core';
import {Http, Headers,RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Auth } from '../services/auth.service';

@Injectable()
export class HttpClient {
    token;
    headers;
    options;
    authSrv: Auth;
    constructor(
        private http: Http
        ) {
        this.token = localStorage.getItem('id_token');
        this.headers = new Headers({ 'Authorization': 'JWT ' + this.token });
        this.options = new RequestOptions({ headers: this.headers });
    }

    //custom get with auth token
    get(url) {

        return this.http.get(url, {
            headers: this.headers
        });
    }

    //custom post with auth token
    post(url, data) {
        return this.http.post(url, data, {
            headers: this.headers
        });
    }

    //custom put with auth token
    put(url, data) {
        return this.http.put(url, data, {
            headers: this.headers
        });
    }

    //custom delete with auth token
    delete(url) {
        return this.http.delete(url, {
            headers: this.headers
        });
    }
}