import { Component, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/interfaces/products';
import { EcommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  constructor(private _EcommerceService:EcommerceService, private _ToastrService:ToastrService, private _Renderer2:Renderer2 ){}

  product:Products[]=[]
  wishlistData:string[]=[]


  ngOnInit(): void {
    this.displayWishlist()   
  }


  displayWishlist():void{
    this._EcommerceService.getUserWishlist().subscribe({
       next:(res)=>{
         this.product = res.data;
       },
       error:(err)=>{
         console.log(err)
       }
    })
  }

  addToCart(id:any, ele:HTMLButtonElement):void{
    this._Renderer2.setAttribute(ele, 'disabled', 'true');
    this._EcommerceService.addToCart(id).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message);
        this._Renderer2.removeAttribute(ele, 'disabled');
        this.removeWishlist(id);
        this._EcommerceService.cartNumber.next(res.numOfCartItems);
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(ele, 'disabled');
      }
    })
  }


  removeFav(proId:any){
    this._EcommerceService.removeFromWishlist(proId).subscribe({
      next:(res)=>{
      this._ToastrService.success(res.message);
      this.wishlistData = res.data;

      this._EcommerceService.getUserWishlist().subscribe({
        next:(res)=>{
          this.product = res.data;
        }
      })
      },
      error:(err)=>{

      }
    })
   }

   removeWishlist(proId:any){
    this._EcommerceService.removeFromWishlist(proId).subscribe({
      next:(res)=>{
      this.wishlistData = res.data;

      this._EcommerceService.getUserWishlist().subscribe({
        next:(res)=>{
          this.product = res.data;
        }
      })
      },
      error:(err)=>{

      }
    })
   }

 

}
