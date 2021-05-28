import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/Product';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth-service/auth-service.service';
import { CategoryService } from 'src/app/service/category-service/category.service';
import { FileService } from 'src/app/service/file-service/file.service';
import { ProductService } from 'src/app/service/product-service/product.service';
import { AuthGuard } from 'src/helpers/authGuard';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productForm = new FormGroup({
    name: new FormControl(),
    quantity: new FormControl(),
    price: new FormControl(),
    code: new FormControl()
  })

  categorySelected: Category[] = [];
  categories: Category[] = []
  currentUser: User;
  headers: HttpHeaders;
  selectedFiles: any;
  currentFile: any
  progress = 0;
  message = '';


  constructor(private fileService: FileService, private http: HttpClient, private productService: ProductService, private route: Router, private categoryService: CategoryService, private authService: AuthService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);

    this.headers = new HttpHeaders({
      "Authorization": "Bearer " + this.currentUser.token,
      'Content-Type': 'application/json'
    })
  }

  get name(): any {
    return this.productForm.get("name") as FormArray;
  }
  get price(): any {
    return this.productForm.get("price") as FormArray;
  }
  get quantity(): any {
    return this.productForm.get("quantity") as FormArray;
  }
  get file(): any {
    return this.productForm.get("file") as FormArray;
  }
  get code(): any {
    return this.productForm.get("code") as FormArray;
  }

  ngOnInit(): void {
    this.getCategories();
    console.log(this.categories);
  }

  addCategorySelected(ischecked: boolean, event: any, category: Category) {
    this.categorySelected.push(category);
  }

  toggleVisibility(e: any, cat: Category) {
    if (e.target.checked) {
      this.categorySelected.push(cat);
    } else {
      this.categorySelected.splice(this.categorySelected.indexOf(cat), 1);
    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        console.log(data);
        this.categories = data
      }, error => {
        console.log("error getting data");

      }
    )
  }
  upload(code: string) {
    debugger
    this.currentFile = this.selectedFiles.item(0);
    let formData = new FormData();
    formData.append("file", this.currentFile);
    formData.append("code", code);
    return this.http.post("http://localhost:8080/file/upload", formData).subscribe(data=>{
      console.log(data);
    })
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  onSubmit(): void {
    debugger
    this.currentUser = this.authService.currentUserValue;
    let product = new Product(this.name.value, this.quantity.value, this.price.value, this.categorySelected, this.code.value)
    this.productService.addProduct(product).subscribe(
      data => {
      },
      error => {
      }
    );
    this.upload(this.code.value);
  }
}
