import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/Product';
import { ProductDto } from 'src/app/model/ProductDto';
import { CategoryService } from 'src/app/service/category-service/category.service';
import { ProductService } from 'src/app/service/product-service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService, private categoryService: CategoryService) { }
  products: ProductDto[] = [];
  categories: Category[] = []
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      console.log(this.products,"productDto");
      
    })
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(data=>{
      this.categories = data;
      console.log(this.categories,"productcat");
      
    })
  }
}
