import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { EcommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(private _EcommerceService:EcommerceService, private _Renderer2:Renderer2, private _Router:Router){}

  cart:any = null
 
  ngOnInit(): void {
    this.displayProduct()
  }

 displayProduct():void{
   this._EcommerceService.getUserCart().subscribe({
      next:(res)=>{
        console.log(res)
        this.cart = res;
      },
      error:(err)=>{
        console.log(err)
      }
   })
 }


 removeItem(id:string, ele:HTMLButtonElement){
this._Renderer2.setAttribute(ele, 'disabled', 'true');
  this._EcommerceService.deleteProductCart(id).subscribe({
    next:(res)=>{
      this.cart = res;
      this._Renderer2.removeAttribute(ele, 'disabled');

      this._EcommerceService.cartNumber.next(res.numOfCartItems)
    },
    error:(err)=>{
      this._Renderer2.removeAttribute(ele, 'disabled');
    }
  })
 }

 clearItems():void{
  this._EcommerceService.clearCart().subscribe({
    next:(res)=>{
      console.log(res)
      this.cart = null
      this._Router.navigate(['/home'])     
    },
    error:(err)=>{
      console.log(err)
    }
  })
 }

 ChangeCount(count:number, proId:string, ele:HTMLButtonElement):void{
  this._Renderer2.setAttribute(ele, 'disabled', 'true');
  this._EcommerceService.updateCartProduct(count, proId).subscribe({
    next:(res)=>{
      this.cart = res
      this._Renderer2.removeAttribute(ele, 'disabled');
    },
    error:(err)=>{
      console.log(err)
      this._Renderer2.removeAttribute(ele, 'disabled');
    }
  })
 }

}
