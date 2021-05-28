import { Component } from '@angular/core';
import { Role } from './model/Role';
import { RoleEnum } from './model/RoleEnum';
import { User } from './model/User';
import { AuthService } from './service/auth-service/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce-shop';

}
