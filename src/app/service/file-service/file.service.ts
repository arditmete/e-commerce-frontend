import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/Product';
import { ProductDto } from 'src/app/model/ProductDto';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  API_NAME = "http://localhost:8080";
  headers: HttpHeaders;
  currentUser: User;
  constructor(private http: HttpClient) { 

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);

    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token,
      'Content-Type': 'multipart/form-data',
    });
  }

  upload(file: File,product: any): Observable<HttpEvent<any>> {
    debugger
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append("product", product);
    const req = new HttpRequest('POST', `${this.API_NAME}/upload`, formData,  {headers: this.headers});

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.API_NAME}/files`);
  }
}
