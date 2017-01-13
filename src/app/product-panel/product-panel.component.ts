import { Component, OnInit, NgZone } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CreateProductDialogComponent } from '../create-product-dialog/create-product-dialog.component';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Products } from '../common/products.interface';
import { MdSnackBar } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomEmailFilterPipe } from '../pipes/custom-email-filter.pipe';

@Component({
  selector: 'app-product-panel',
  templateUrl: './product-panel.component.html',
  styleUrls: ['./product-panel.component.css']
})
export class ProductPanelComponent implements OnInit {
  editForm: FormGroup;
  products: Observable<Products[]>;
  productList: any = [];
  editType: any;
  search: string = '';
  editing: boolean = false;
  productIndex: any;
  buttonEnabled: any = false;
  constructor(
    private productSrv: ProductService,
    public dialog: MdDialog,
    private _zone: NgZone,
    private formB: FormBuilder,
    public snackBar: MdSnackBar,
  ) {
    //form for editing product and validation
    this.editForm = this.formB.group({
      'title': [null, Validators.compose([ Validators.nullValidator])],
      'description': [null, Validators.compose([ Validators.nullValidator])],
    });
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


  //open toast message
  openSnackBar(message) {
    this.snackBar.open(message, 'CLOSE', {
      duration: 2000,
    });
  }

  //show edit view
  showEdit(index, type) {
    this.editing = true;
    this.productIndex = index;
    this.editType = type;
    if (type === 1 || type === 0) {
      this.buttonEnabled = true;
    }
  }

  //edit product
  editProduct(id,data,type){
    let product;
    let admin;
    console.log('type',type);
    if (type === 1) {
      product = {
        title: data.title
      };
    } else if (type === 2) {
      product = {
        description: data.description
      };
    }
    console.log('user', product);
    this.productSrv.editProduct(id, product)
      .then(res => {
        this.openSnackBar('Product edited.');
        this.editing = false;
        this.editType = '';
      })
      .catch(err => {
        console.log(err.json());
        this.openSnackBar(err.json().reason);
      })
  }

  //hide edit view
  goBack() {
    this.editing = false;
    this.editType = '';
  }

  //delete product
  deleteProduct(id){
    this.productSrv.deleteProduct(id)
    .then(res=>{
      this.openSnackBar('Product deleted.');
    })
    .catch(err=>{
      this.openSnackBar('Error deleting product');
    })
  }

  //open dialog component to create product
  openDialog() {
    let dialogRef = this.dialog.open(CreateProductDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'CREATED') {
        this.openSnackBar('Product created');
      } else if (result === 'ERROR') {
        this.openSnackBar('Error creating product');
      }
    });
  }

}
