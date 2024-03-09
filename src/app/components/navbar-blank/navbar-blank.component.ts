import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EcommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.css']
})
export class NavbarBlankComponent {

  constructor(private _AuthService:AuthService, private _Router:Router, private _EcommerceService:EcommerceService){}


cartNum:number = 0;

  ngOnInit(): void {
    this._EcommerceService.cartNumber.subscribe({
      next:(res)=>{
        this.cartNum = res
      }
    })

    this._EcommerceService.getUserCart().subscribe({
      next:(res)=>{
        this.cartNum = res.numOfCartItems
      }
    })
    
  }

  singOut():void{
   this._AuthService.logOut();
  }

  

}
