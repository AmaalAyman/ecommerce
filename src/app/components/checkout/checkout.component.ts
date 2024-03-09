import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EcommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  constructor(private _EcommerceService:EcommerceService,private _FormBuilder:FormBuilder, private _Router:Router, private _ActivatedRoute:ActivatedRoute){}

  errMsg:string = '';
  cartId:any = ''
  
checkoutForm: FormGroup = this._FormBuilder.group({
    details:['', [Validators.required, Validators.minLength(3)]],
    phone:['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city:['', [Validators.required]]
  })


  ngOnInit(): void {
     this._ActivatedRoute.paramMap.subscribe({
      next:(parms)=>{
       this.cartId = parms.get('id')
      }
     })
    
  }

handleForm():void{
  console.log(this.checkoutForm.value)
  this._EcommerceService.checkoutSession(this.cartId, this.checkoutForm.value).subscribe({
    next:(res)=>{
      if(res.status == 'success'){
        window.open(res.session.url, '_self')
    }
  }
})
}

}
