import { Component, Renderer2 } from '@angular/core';
import { Category, Products } from 'src/app/interfaces/products';
import { EcommerceService } from 'src/app/services/ecommerce.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent {

  constructor(private _ecommerceService:EcommerceService, private _ToastrService:ToastrService, private _Renderer2:Renderer2){}

  
  searchTerm:string = ''
  product:Products[] = [];
  category:Category[] = [];
  wishlistData:string[]=[]

ngOnInit(): void {
   this.allProducts();
  this.allCategory();
  this.getWishlist();

}

  allProducts(){
    this._ecommerceService.getAllProducts().subscribe({
      next:(res)=>{
        this.product = res.data;
      }
    })
  }


  allCategory(){
    this._ecommerceService.getCategory().subscribe({
      next:(res)=>{
        this.category = res.data;
      }
    })
  }

  addProduct(id:string, ele:HTMLButtonElement){
    this._Renderer2.setStyle(ele, "visibility", "hidden");

    this._ecommerceService.addToCart(id).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message);
        this._Renderer2.removeStyle(ele, "visibility");

        this._ecommerceService.cartNumber.next(res.numOfCartItems)
      },
      error:(err)=>{
        this._Renderer2.removeStyle(ele, "visibility");
      }
    });
  }


  addFav(id:string):void{
    this._ecommerceService.addToWishlist(id).subscribe({
     next:(res)=>{
        this._ToastrService.success(res.message);
        this.wishlistData = res.data
    },
    error:(err)=>{
     
    }
    })
  }

  removeFav(proId:any){
    this._ecommerceService.removeFromWishlist(proId).subscribe({
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
    this._ecommerceService.getUserWishlist().subscribe({
      next:(res)=>{
        const newData = res.data.map((item:any)=> item._id);
        this.wishlistData = newData;
      }
    })
   }




  mainSliderOptions: OwlOptions = {
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

    categorySliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:6,
    nav: true
  }


}
