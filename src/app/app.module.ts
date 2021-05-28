import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CategoryComponent } from './components/category/category.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { BlocksWrapComponent } from './layout/blocks-wrap/blocks-wrap.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { NewProductsComponent } from './layout/new-products/new-products.component';
import { PolicyComponent } from './layout/policy/policy.component';
import { ProductsComponent } from './layout/products/products.component';
import { SliderComponent } from './layout/slider/slider.component';
import { TestimonialsComponent } from './layout/testimonials/testimonials.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ErrorInterceptor } from 'src/helpers/ErrorInterceptor';
import { JwtInterceptor } from 'src/helpers/jwtInterceptor';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SliderComponent,
    BlocksWrapComponent,
    ProductsComponent,
    PolicyComponent,
    NewProductsComponent,
    TestimonialsComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    CategoryComponent,
    ProductComponent
    ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule, 
    MatFormFieldModule, 
    MatSelectModule
    
    ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }