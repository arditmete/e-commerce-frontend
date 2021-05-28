import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth-service/auth-service.service';
import { TokenStorageService } from 'src/app/service/auth-service/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  constructor(private tokenStorageService: TokenStorageService, private router: Router, private authService: AuthService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
   }
  isLoggedIn = false;

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log(this.isLoggedIn,"loggin");
    
  }

  logout() {
  this.authService.logout();
  this.isLoggedIn = this.authService.isUserLoggedIn();
  console.log(this.isLoggedIn,"loggin2");
  }

  reloadPageHome(){
    this.router.navigate(["/home"]).finally(() => {
      window.location.reload();
    });
  }
}
