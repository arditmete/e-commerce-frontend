import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtRequest } from 'src/app/model/JwtRequest';
import { User } from 'src/app/model/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoleEnum } from 'src/app/model/RoleEnum';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  AUTH_API: string = 'http://localhost:8080/admin/';
  isLoggedIn = false;

  httpOptions = {
    headers: new HttpHeaders({ "Access-Control-Allow-Credentials": "true" })
  }

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') as string));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return JSON.parse(localStorage.getItem('currentUser') as string);
  }

  login(jwtRequest: JwtRequest): Observable<any> {
    return this.http.post('http://localhost:8080/authenticate', jwtRequest, this.httpOptions).pipe(map(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user as User);
      return user;
    }));
  }

  logout(): void {
    window.sessionStorage.clear();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
    this.currentUserSubject.next(null as any);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(this.AUTH_API + 'signup', {
      username,
      email,
      password
    }, this.httpOptions);
  }

  isUserLoggedIn(): boolean {
   let currentUser =  JSON.parse(localStorage.getItem('currentUser') as string);
   if(currentUser){
    this.isLoggedIn == true;
   }else{
     this.isLoggedIn == false;
   }
   return this.isLoggedIn;
  }

  isAdminUser(): boolean {
    let currentUser =  JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser.role.name == RoleEnum.Admin) {
      return true;
    }
    return false;
  }

  logoutUser(): void {
    this.isLoggedIn == false;
  }

}