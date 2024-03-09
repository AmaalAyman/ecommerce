import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Orders } from 'src/app/interfaces/orders';
import { EcommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent {

  constructor(private _EcommerceService:EcommerceService){}

userOrder:Orders[] = []

  ngOnInit(): void {
 
    this.allOrders()
    
  }




  allOrders():void{

    if(localStorage.getItem('eToken') != null){
      let encodeToken:any = localStorage.getItem('eToken');
      let decodeToken:any = jwtDecode(encodeToken);
      let userData = decodeToken;
      let userId = decodeToken.id;
      console.log(decodeToken);
      console.log(userId)

      this._EcommerceService.getUserOrders(userId).subscribe({
        next:(res)=>{
          this.userOrder = res;
          console.log(res)
        }
      })
    }

  }

}
