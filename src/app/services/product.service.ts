import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '../core/http-client';
import { Config } from '../core/config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Products } from '../common/products.interface';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class ProductService {
  public products: Observable<Products[]>;
  private _products = new BehaviorSubject<Products[]>([]);
  private _productsObserver: Observer<Products[]>;
  private dataStore: {
    products: Products[]
  };
  constructor(
    private router: Router,
    private http: HttpClient,
    private config: Config
  ) {
    this.dataStore = { products: [] }
    this._products = <BehaviorSubject<Products[]>>new BehaviorSubject([]);
    this.products = this._products.asObservable();
  }

  createProduct(params: any, files: Array<File>) {
    return new Promise((resolve, reject) => {
      this.uploadPhoto(files)
        .then(res => {
          let response:any = res;
          console.log('res',response.id);
          this.fillInfo(response.id,params)
          .then(resp=>{
            resolve(resp);
          })
          .catch(error=>{
            reject(error);
          })
        })
        .catch(err => {
          reject(err);
        })
    });
  }

  uploadPhoto(file: Array<File>) {
    let url = `${this.config.baseUrl}product/uploadPhoto/${window.localStorage.getItem('id_user')}`
    return new Promise((resolve, reject) => {
      let formData: any = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('photo', file[0], file[0].name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST', url);
      xhr.setRequestHeader('Authorization', `JWT ${localStorage.getItem('id_token')}`);
      xhr.send(formData);
    });
  }

  fillInfo(id,data) {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.config.baseUrl}product/fillProduct/${id}`, data)
        .map(response => response.json())
        .subscribe(data => {
          console.log('data', data);
          this.dataStore.products = data.products;
          this._products.next(Object.assign({}, this.dataStore).products);
          resolve(data);
        }, error => reject(error));
    });
  }

  editProduct(id, data) {
    console.log('user data', data);
    return new Promise((resolve, reject) => {
      this.http.put(`${this.config.baseUrl}product/editProduct/${id}`, data)
        .map(response => response.json())
        .subscribe(data => {
          console.log('data', data);
          this.dataStore.products = data.products;
          this._products.next(Object.assign({}, this.dataStore).products);
          resolve(data);
        }, error => reject(error));
    });
  }

  getProducts() {
    this.http.get(`${this.config.baseUrl}product`)
      .map(response => response.json())
      .subscribe(data => {
        console.log('data', data);
        this.dataStore.products = data;
        this._products.next(Object.assign({}, this.dataStore).products);
      }, error => console.log('Could not load products.'));
  }

  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.config.baseUrl}product/deleteProduct/${id}`)
        .map(response => response.json())
        .subscribe(data => {
          console.log('data', data);
          this.dataStore.products = data.products;
          this._products.next(Object.assign({}, this.dataStore).products);
          resolve(data);
        }, error => reject(error));
    })

  }
}
