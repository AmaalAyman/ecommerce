import { Component } from '@angular/core';
import { Brands } from 'src/app/interfaces/brands';
import { EcommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {

constructor(private _EcommerceService:EcommerceService){}

ngOnInit(): void {
  
  this.allBrands()
}

flag:boolean = true
brand:Brands[]=[]
viewBrand:any={}

allBrands():void{
  this._EcommerceService.getAllBrands().subscribe({
    next:(res)=>{
      this.brand = res.data
    }
  })
}

displayBrand(ele:any):void{
    this.viewBrand = ele
}

}
