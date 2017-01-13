import { Component, OnInit, NgZone } from '@angular/core';
import { Products } from '../common/products.interface';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs/Observable';
import { Config } from '../core/config';
@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.css']
})
export class ProductCardsComponent implements OnInit {
  products: Observable<Products[]>;
  productList: any = [];
  search:string = '';
  orderOptions = [
    {
      title: 'Latest',
      value: '-'
    },
    {
      title: 'Oldest',
      value: '+'
    }
  ];
  valueSelected:string = '-';
  constructor(
    private _zone: NgZone,
    private config: Config,
    private productSrv: ProductService,
  ) { 

  }

  //sorting
  changeValue(newValue){
    console.log(newValue);
    this.valueSelected = newValue;
  }

  //initializing asynchronous array
  ngOnInit() {
    this.productSrv.getProducts();
    this.products = this.productSrv.products;
    console.log('products', this.products);
    this.productSrv.products.subscribe(data => {
      console.log('ononit data',data);
      this._zone.run(() => this.productList = data);
      console.log(this.productList);
    });
  }

}
