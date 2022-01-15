import type { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import type { Router } from '@angular/router';
import type { User } from 'src/app/model/User';
import type { AuthService } from 'src/app/service/auth-service/auth-service.service';
import type { TokenStorageService } from 'src/app/service/auth-service/token-storage.service';

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
