import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/Product';
import { ProductDto } from 'src/app/model/ProductDto';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  headers: HttpHeaders;
  API_NAME = "http://localhost:8080/product/admin/";
  currentUser: User;

  constructor(private http: HttpClient) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token,
      "Content-Type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Headers": "true",
      "Access-Control-Allow-Origin": "true"
    });
  }

getProducts(){
  return this.http.get<ProductDto[]>("http://localhost:8080/product/admin/product-list", { headers: this.headers });
}

  addProduct(product: Product): Observable<any> {

    return this.http.post(this.API_NAME + 'create-product', product,
      {headers: this.headers})
  }


}
