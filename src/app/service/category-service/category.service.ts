import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  headers: HttpHeaders;
  API_NAME = "http://localhost:8080/category/admin/";
  currentUser: User;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);

    this.headers = new HttpHeaders({
      "Authorization": "Bearer " + this.currentUser.token,
      'Content-Type': 'application/json'
    })
  }

  addCategory(category: Category): Observable<any> {
    return this.http.post(this.API_NAME + 'create-category', category);
  }

  getCategories(): Observable<Category[]> {

    return this.http.get<Category[]>("http://localhost:8080/category/admin/categories", { headers: this.headers });
  }

}
