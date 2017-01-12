import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrls: ['./create-product-dialog.component.css']
})
export class CreateProductDialogComponent implements OnInit {
  public newUser: FormGroup;
  admin;
  filesToUpload: Array<File>;
  buttonEnabled:any = false;
  constructor(
    public dialogRef: MdDialogRef<CreateProductDialogComponent>,
    private formB: FormBuilder,
    private productSrv: ProductService
  ) { 
    this.newUser = formB.group({
      'title': [null, Validators.compose([Validators.required, Validators.nullValidator])],
      'description': [null, Validators.compose([Validators.required, Validators.nullValidator])],
      'file': [null, Validators.compose([Validators.required, Validators.nullValidator])],
    });
  }

  ngOnInit() {
  }

  fileChangeEvent(fileInput: any) {
    this.buttonEnabled = true;
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

  createProduct(data,valid){
    console.log(data);
    this.productSrv.createProduct(data,this.filesToUpload)
    .then(res=>{
      console.log('product res',res);
      this.dialogRef.close('CREATED');
    })
    .catch(err=>{
      this.dialogRef.close('ERROR');
    })
  }

}
