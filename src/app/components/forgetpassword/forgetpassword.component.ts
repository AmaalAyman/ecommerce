import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EcommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {

constructor( private _EcommerceService:EcommerceService, private _Router:Router){}



  verfiyForm: FormGroup = new FormGroup({
    email: new FormControl('')
 });


  forgetPassword(){
     let userEmail = this.verfiyForm.value;

    this._EcommerceService.forgotPassword(userEmail.email).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.statusMsg == "success"){
        this._Router.navigate(['/verifyPassword']);
        }
      }
    })
  }

  

}
