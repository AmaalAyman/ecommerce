import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/interfaces/products';
import { EcommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent {

constructor(private _ActivatedRoute:ActivatedRoute, private _EcommerceService:EcommerceService, private _Renderer2:Renderer2, private _ToastrService:ToastrService){}


wishlistData:string[]=[];

ngOnInit(): void {

 this.detailsProductComponent();
 this.getWishlist();
  
}

productDetails:Products = {} as Products;
images:string[]=[]

detailsProductComponent():void{
   this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
      let idProduct:any = params.get('id');
      
      this._EcommerceService.getProduct(idProduct).subscribe({
        next:(res)=>{
          this.productDetails = res.data;
          this.images = res.data.images;
          console.log(this.productDetails)
        },
      });
      }
    })
    
}

addProduct(id:string, ele:HTMLButtonElement){
  this._Renderer2.setAttribute(ele, 'disabled', 'true');

  this._EcommerceService.addToCart(id).subscribe({
    next:(res)=>{
      this._ToastrService.success(res.message);
      this._Renderer2.removeAttribute(ele, 'disabled');

      this._EcommerceService.cartNumber.next(res.numOfCartItems)
    },
    error:(err)=>{
      this._Renderer2.removeAttribute(ele, 'disabled');
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



 imageSliderOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  items:1,
  nav: true
}

}
