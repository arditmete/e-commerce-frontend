import type { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import type { Category } from 'src/app/model/category';
import type { CategoryService } from 'src/app/service/category-service/category.service';

@Component({
  selector: 'app-blocks-wrap',
  templateUrl: './blocks-wrap.component.html',
  styleUrls: ['./blocks-wrap.component.scss']
})
export class BlocksWrapComponent implements OnInit {

  categories: Category[]= [];
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(data=>{
      this.categories = data;
    })
  }
}
