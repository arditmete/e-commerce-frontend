import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/authGuard';
import { CategoryComponent } from './components/category/category.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { RoleEnum } from './model/RoleEnum';

const routes: Routes = [
  {
    path:"sign-in",
    component: LoginComponent
  },
  {
    path:"home",
    component: HomeComponent,
    canActivate:[AuthGuard],
    data: { roles : [RoleEnum.Admin]}
  },
  {
    path:"",
    component: LoginComponent,
  },
  {
    path:"*",
    redirectTo: "sign-in"
  },
  {
    path:"categories",
    component: CategoryComponent,
    canActivate:[AuthGuard],
    data: { roles : [RoleEnum.Admin]}
  },
  {
    path:"products",
    component: ProductComponent,
    canActivate:[AuthGuard],
    data: { roles : [RoleEnum.Admin]}
  },
  {
    path:"register",
    component: RegisterComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
