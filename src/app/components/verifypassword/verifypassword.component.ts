import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EcommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'app-verifypassword',
  templateUrl: './verifypassword.component.html',
  styleUrls: ['./verifypassword.component.css']
})
export class VerifypasswordComponent {

  constructor(private _EcommerceService:EcommerceService, private _Router:Router){}


  errMsg:string = ''

  resetCode: FormGroup = new FormGroup({
    resetCode: new FormControl('')
   });

  
    verfiyPassword(){
      let resetsCode = this.resetCode.value;
      let checkNum = resetsCode.resetCode;
      
      
      this._EcommerceService.verifyResetCode(checkNum).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.status == "Success"){
            this._Router.navigate(['/resetPassword'])
          }
        },
        error:(err)=>{
          this.errMsg = err.error.message;
        }
      })
   }

}
