import type { HttpClient, HttpEvent} from '@angular/common/http';
import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { User } from 'src/app/model/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

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
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append("product", product);
    const req = new HttpRequest('POST', `${environment.APIURL}/upload`, formData,  {headers: this.headers});

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${environment.APIURL}/files`);
  }
}
