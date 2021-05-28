import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category-service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  currentUser: any;
  categoryForm = new FormGroup({
    name: new FormControl()
  })
  constructor(private categoryService: CategoryService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
   }

  ngOnInit(): void {
  }

   get name(): any{
   return  this.categoryForm.get("name")?.value as FormArray;
  }

  onSubmit(){
    let category = new Category(this.name);
    this.categoryService.addCategory(category).subscribe(
      data=>{
      }
    )
  }
}
