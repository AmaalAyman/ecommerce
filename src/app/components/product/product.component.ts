import { Component, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/interfaces/products';
import { EcommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

constructor(private _EcommerceService:EcommerceService, private _Renderer2:Renderer2, private _ToastrService:ToastrService){}


ngOnInit(): void {
  this.Products();
  this.getWishlist();
}

allProduct:Products[] = [];
wishlistData:string[]=[];
searchTerm:string = ''

Products(){
this._EcommerceService.getAllProducts().subscribe({
  next:(res)=>{
    this.allProduct = res.data;
  }
})
}

addProduct(id:string, ele:HTMLButtonElement){
  this._Renderer2.setStyle(ele, "visibility", "hidden");

  this._EcommerceService.addToCart(id).subscribe({
    next:(res)=>{
      this._ToastrService.success(res.message);
      this._Renderer2.removeStyle(ele, "visibility");

      this._EcommerceService.cartNumber.next(res.numOfCartItems)
    },
    error:(err)=>{
      this._Renderer2.removeStyle(ele, "visibility");
    }
  });
}

addFav(id:string):void{
  this._EcommerceService.addToWishlist(id).subscribe({
   next:(res)=>{
      this._ToastrService.success(res.message);
      this.wishlistData = res.data
  },
  error:(err)=>{
   
  }
  })
}

removeFav(proId:any){
  this._EcommerceService.removeFromWishlist(proId).subscribe({
    next:(res)=>{
    console.log(res)
    this._ToastrService.success(res.message);
    this.wishlistData = res.data
    },
    error:(err)=>{

    }
  })
 }

 getWishlist():void{
  this._EcommerceService.getUserWishlist().subscribe({
    next:(res)=>{
      const newData = res.data.map((item:any)=> item._id);
      this.wishlistData = newData;
    }
  })
 }


}
