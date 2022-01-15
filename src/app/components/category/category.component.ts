import { Component, OnInit } from '@angular/core';
import type { FormArray} from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/model/category';
import type { CategoryService } from 'src/app/service/category-service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent  {

  currentUser: any;
  categoryForm = new FormGroup({
    name: new FormControl()
  })
  constructor(private categoryService: CategoryService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
   }

 

   get name(): any{
   return  this.categoryForm.get("name")?.value as FormArray;
  }

  onSubmit(){
    const category = new Category(this.name);
    this.categoryService.addCategory(category).subscribe(
      data=>{
      }
    )
  }
}
