import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService  {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
   API_NAME = environment.APIURL + "user/admin/"

  constructor(private http:HttpClient) {
  }

  register(user:User) : Observable<any> {

    return this.http.post(this.API_NAME + 'create-user', user)
  }
}
