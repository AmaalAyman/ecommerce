import { Component } from '@angular/core';
import { Category } from 'src/app/interfaces/products';
import { SubCategory } from 'src/app/interfaces/sub-category';
import { EcommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  constructor(private _EcommerceService:EcommerceService){}

categories:Category[]=[]
subCategory:SubCategory[]=[]
specificSubCategory:any[]=[]
newId:string = ''
newName:string = ''
subCategoryName:string = ''



ngOnInit(): void {
  this.allCategory()
  this.allSubCategory()
}

allCategory():void{
  this._EcommerceService.getCategory().subscribe({
    next:(res)=>{
      this.categories = res.data
    }
  })
}


allSubCategory():void{
  this._EcommerceService.getAllSubCategories().subscribe({
    next:(res)=>{
      this.subCategory = res.data
      console.log(res.data)
    }
  })
}

displaySubCategory(id:string, name:string):void{
  this.specificSubCategory = []
  this.newId = id;
  this.newName = name;

  for (var val of this.subCategory) {
    if(this.newId == val.category){
      this.specificSubCategory.push(val);
    }
  }
}

}
